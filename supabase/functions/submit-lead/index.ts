// ============================================================================
// Edge Function `submit-lead` — fonte-da-verdade versionada.
//
// Grava o lead do site na tabela `sba_leads` (via service role) e dispara um
// aviso por e-mail (Resend), best-effort. O site NUNCA escreve direto na tabela:
// nesta base o papel `anon` é proibido de inserir/ler (trava de segurança).
//
// Deploy: `supabase functions deploy submit-lead --project-ref lbjudeifksyeqminwlto`
// Segredos necessários (NÃO commitados — setar no Supabase):
//   - RESEND_API_KEY      → chave do Resend (sem ela, o e-mail é pulado; o lead grava igual)
//   - LEAD_NOTIFY_TO      → destino do aviso (default: eduardo@saobentoservicos.com.br)
//   - LEAD_NOTIFY_FROM    → remetente do aviso
//   - SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY → injetados automaticamente pelo Supabase
//
// ⚠️ Este arquivo é o código versionado; a instância deployada pode ter um
// fallback de chave setado em runtime (risco aceito pelo dono). NÃO coloque
// chave literal aqui — repo é público.
//
// Anti-spam 3 (rate-limit por IP — 5º mandato, 2026-08-13): antes do insert,
// conta os leads do mesmo IP (header `x-forwarded-for`) nos últimos 10 minutos;
// com 3 ou mais, responde 429. Verificado no schema real (2026-08-13): a tabela
// `sba_leads` TEM `created_at` (timestamptz, default now()), mas NÃO tinha coluna
// de IP. A migração foi aplicada e conferida em 2026-08-21 (coluna `ip` existe).
// Ainda assim o código degrada com segurança: a contagem falha ABERTA (loga e
// segue) e o insert cai num fallback sem `ip` — nenhum lead humano se perde.
// ============================================================================
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const CHAVE_RESEND = Deno.env.get("RESEND_API_KEY") ?? "";
const NOTIFY_TO = Deno.env.get("LEAD_NOTIFY_TO") ?? "eduardo@saobentoservicos.com.br";
const NOTIFY_FROM = Deno.env.get("LEAD_NOTIFY_FROM") ?? "SBA Negocios <onboarding@resend.dev>";

async function notificar(lead) {
  if (!CHAVE_RESEND) return;
  try {
    const linhas = [
      `Tipo: ${lead.tipo}`,
      `Nome: ${lead.nome}`,
      `E-mail: ${lead.email}`,
      lead.telefone ? `Telefone: ${lead.telefone}` : null,
      lead.organizacao ? `Organizacao: ${lead.organizacao}` : null,
      lead.perfil ? `Perfil: ${lead.perfil}` : null,
      "",
      "Mensagem:",
      lead.mensagem,
    ].filter((l) => l !== null);
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CHAVE_RESEND}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        reply_to: lead.email,
        subject: `Novo lead (${lead.tipo}) no site SBA - ${lead.nome}`,
        text: linhas.join("\n"),
      }),
    });
    if (!resp.ok) {
      console.error("Resend falhou:", resp.status, await resp.text());
    } else {
      console.log("Resend ok:", resp.status);
    }
  } catch (e) {
    console.error("Resend erro:", e instanceof Error ? e.message : String(e));
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Metodo nao permitido" }, 405);

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Requisicao invalida" }, 400);
  }

  const str = (v) => (typeof v === "string" ? v.trim() : "");

  // Anti-spam 1: honeypot. Se vier preenchido, e bot: 200 ok SEM gravar.
  if (str(body.hp)) return json({ ok: true });

  // Anti-spam 2: tempo minimo. Submit quase instantaneo e bot. Nao descarta
  // em silencio (pra nunca perder lead humano): pede pra reenviar.
  const elapsed = Number(body.elapsed_ms);
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 1500) {
    return json({ error: "Envio muito rapido. Tente novamente." }, 422);
  }

  const tipo = str(body.tipo) === "parceiro" ? "parceiro" : "contato";
  const nome = str(body.nome);
  const email = str(body.email);
  const mensagem = str(body.mensagem);
  const telefone = str(body.telefone) || null;
  const organizacao = str(body.organizacao) || null;
  const perfil = tipo === "parceiro" ? (str(body.perfil) || null) : null;

  if (!nome || nome.length > 200) return json({ error: "Nome invalido" }, 422);
  if (!email || email.length > 200 || !email.includes("@")) return json({ error: "E-mail invalido" }, 422);
  if (!mensagem || mensagem.length > 5000) return json({ error: "Mensagem invalida" }, 422);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
  );

  // Anti-spam 3: rate-limit por IP. O `x-forwarded-for` pode trazer uma lista
  // ("cliente, proxy1, proxy2") — o IP do cliente é o primeiro. Sem o header,
  // a checagem é pulada (falha aberta: nunca se perde lead humano por isso).
  const ip = (req.headers.get("x-forwarded-for") ?? "")
    .split(",")[0]
    .trim()
    .slice(0, 100) || null;

  if (ip) {
    const desde = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count, error: erroContagem } = await supabase
      .from("sba_leads")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", desde);
    if (erroContagem) {
      // Falha ABERTA (ex.: coluna `ip` ainda nao migrada): loga e segue.
      console.error("Rate-limit: contagem falhou, seguindo sem limite:", erroContagem.message);
    } else if ((count ?? 0) >= 3) {
      return json({
        error:
          "Recebemos varios envios seguidos deste endereco. Aguarde alguns minutos e tente novamente — ou, se preferir, escreva direto para " +
          NOTIFY_TO + ".",
      }, 429);
    }
  }

  const lead = { tipo, nome, email, telefone, organizacao, perfil, mensagem, origem: "site-sba-negocios" };

  let { error } = await supabase.from("sba_leads").insert({ ...lead, ip });
  if (error) {
    // Fallback pre-migracao: se o insert com `ip` falhar (coluna ainda nao
    // existe), tenta sem `ip` — nenhum lead se perde por causa do rate-limit.
    console.error("Insert com ip falhou, tentando sem ip:", error.message);
    ({ error } = await supabase.from("sba_leads").insert(lead));
  }
  if (error) {
    console.error("Erro ao gravar lead:", error.message);
    return json({ error: "Falha ao salvar o contato" }, 500);
  }

  // Aviso por e-mail best-effort: o lead ja esta salvo; falha aqui nao quebra.
  await notificar(lead);

  return json({ ok: true });
});
