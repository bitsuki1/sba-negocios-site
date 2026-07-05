import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";
import { CONTATO } from "@/data/site";
import { supabase } from "@/lib/supabase";

type Variante = "contato" | "parceiro";

interface FormularioContatoProps {
  variante?: Variante;
}

type Status = "idle" | "enviando" | "ok" | "erro";

/**
 * Formulário reutilizável de contato.
 *
 * Envia o lead para a Edge Function `submit-lead` do Supabase (projeto
 * gestao-integrada-dados), que grava na tabela `sba_leads` com a service role.
 * O site nunca escreve direto na tabela: nesta base o papel `anon` é proibido
 * de inserir/ler (trava de segurança), por isso o caminho oficial é a função.
 * Se o envio falhar por qualquer motivo, cai num fallback por e-mail (mailto)
 * para que nenhum contato se perca.
 */
export const FormularioContato = ({ variante = "contato" }: FormularioContatoProps) => {
  const [status, setStatus] = useState<Status>("idle");
  // Instante em que o formulário foi montado — usado no anti-spam: um envio
  // quase instantâneo é robô. useState com inicializador roda uma única vez.
  const [montadoEm] = useState(() => Date.now());
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    organizacao: "",
    perfil: "",
    mensagem: "",
    hp: "", // honeypot anti-spam: humano nunca preenche
  });

  const ehParceiro = variante === "parceiro";

  const atualizar = (campo: string, valor: string) =>
    setDados((d) => ({ ...d, [campo]: valor }));

  const limpar = (v: string) => {
    const t = v.trim();
    return t.length ? t : null;
  };

  const abrirEmailFallback = () => {
    const assunto = ehParceiro
      ? "Quero ser parceiro da SBA Negócios"
      : "Contato pelo site — SBA Negócios";

    const corpo = [
      `Nome: ${dados.nome}`,
      `E-mail: ${dados.email}`,
      `Telefone: ${dados.telefone}`,
      `Organização: ${dados.organizacao}`,
      ehParceiro ? `Perfil: ${dados.perfil}` : null,
      "",
      "Mensagem:",
      dados.mensagem,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${CONTATO.email}?subject=${encodeURIComponent(
      assunto
    )}&body=${encodeURIComponent(corpo)}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!dados.nome.trim() || !dados.email.trim() || !dados.mensagem.trim()) return;

    setStatus("enviando");

    const { data, error } = await supabase.functions.invoke("submit-lead", {
      body: {
        tipo: variante,
        nome: dados.nome.trim(),
        email: dados.email.trim(),
        telefone: limpar(dados.telefone),
        organizacao: limpar(dados.organizacao),
        perfil: ehParceiro ? limpar(dados.perfil) : null,
        mensagem: dados.mensagem.trim(),
        // Sinais anti-spam validados na Edge Function (não atrapalham humanos):
        hp: dados.hp,
        elapsed_ms: Date.now() - montadoEm,
      },
    });

    // `invoke` devolve `error` em qualquer resposta não-2xx; a função também
    // pode responder 200 com `{ error }` — cobrimos os dois casos.
    if (error || (data as { error?: string } | null)?.error) {
      console.error(
        "Erro ao enviar lead:",
        error?.message ?? (data as { error?: string }).error
      );
      setStatus("erro");
      return;
    }

    setStatus("ok");
  };

  if (status === "ok") {
    return (
      <div
        role="status"
        className="rounded-lg border border-accent/30 bg-accent/5 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h3 className="mt-4 font-display text-xl font-semibold text-primary-dark">
          Mensagem recebida
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Obrigado pelo contato. Recebemos sua mensagem e vamos retornar em breve.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setDados({
              nome: "",
              email: "",
              telefone: "",
              organizacao: "",
              perfil: "",
              mensagem: "",
              hp: "",
            });
            setStatus("idle");
          }}
        >
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pb-16 sm:pb-0">
      {/* Honeypot anti-spam: fora da tela, sem tab e sem autocomplete — humano
          nunca vê nem preenche. Bots costumam preencher; a Edge Function
          descarta silenciosamente quando vier com conteúdo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="site_url">Não preencha este campo</label>
        <input
          id="site_url"
          name="site_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={dados.hp}
          onChange={(e) => atualizar("hp", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            required
            value={dados.nome}
            onChange={(e) => atualizar("nome", e.target.value)}
            placeholder="Seu nome"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            required
            value={dados.email}
            onChange={(e) => atualizar("email", e.target.value)}
            placeholder="voce@exemplo.com.br"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone / WhatsApp</Label>
          <Input
            id="telefone"
            value={dados.telefone}
            onChange={(e) => atualizar("telefone", e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="organizacao">
            {ehParceiro ? "Empresa / Organização" : "Prefeitura / Empresa"}
          </Label>
          <Input
            id="organizacao"
            value={dados.organizacao}
            onChange={(e) => atualizar("organizacao", e.target.value)}
            placeholder={ehParceiro ? "Nome da sua empresa" : "Nome da organização"}
          />
        </div>
      </div>

      {ehParceiro && (
        <div className="space-y-2">
          <Label htmlFor="perfil">Como você pode somar?</Label>
          <Input
            id="perfil"
            value={dados.perfil}
            onChange={(e) => atualizar("perfil", e.target.value)}
            placeholder="Ex.: técnico, jurídico, representante, operador, tecnologia"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="mensagem">Mensagem</Label>
        <Textarea
          id="mensagem"
          required
          value={dados.mensagem}
          onChange={(e) => atualizar("mensagem", e.target.value)}
          placeholder={
            ehParceiro
              ? "Conte um pouco sobre sua atuação e onde você pode contribuir."
              : "Conte o que você precisa. Se for uma prefeitura, diga o nome da cidade."
          }
        />
      </div>

      {status === "erro" && (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm"
        >
          <p className="text-foreground/90">
            Não consegui enviar agora. Você pode tentar de novo ou nos escrever
            direto por e-mail.
          </p>
          <button
            type="button"
            onClick={abrirEmailFallback}
            className="mt-2 font-semibold text-primary underline"
          >
            Enviar por e-mail
          </button>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "enviando"}
      >
        {status === "enviando" && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {status === "enviando"
          ? "Enviando..."
          : ehParceiro
            ? "Enviar candidatura"
            : "Enviar mensagem"}
      </Button>

      <p className="text-xs text-muted-foreground">
        Ao enviar, você concorda em ser contatado pela SBA Negócios sobre este
        assunto e com a nossa{" "}
        <Link to="/privacidade" className="underline hover:text-primary">
          Política de Privacidade
        </Link>
        .
      </p>
    </form>
  );
};
