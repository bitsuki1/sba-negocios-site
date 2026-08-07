// ============================================================================
// PortaoParceiros — portão de senha para material restrito a parceiros/clientes.
//
// O conteúdo protegido NEM CARREGA (chunk lazy) antes da senha correta: o
// portão renderiza no lugar dos filhos até o desbloqueio. A conferência é por
// SHA-256 no navegador (WebCrypto) contra o hash abaixo — a senha em si não
// existe no código. Desbloqueio vale pela aba (sessionStorage).
//
// Trocar a senha: gerar o novo hash (sha256 da senha) e substituir HASH_SENHA.
//   python3 -c "import hashlib;print(hashlib.sha256('NOVA-SENHA'.encode()).hexdigest())"
//
// Limite honesto: é um portão de acesso (barra quem não tem a senha), não um
// cofre — quem recebe a senha consegue repassá-la. Para revogar: troca-se a
// senha e reenvia-se só a quem deve ter.
// ============================================================================
import { useState, type FormEvent, type ReactNode } from "react";

// Trocada em 2026-08-07 a pedido do MOU. A anterior tinha sido enviada só no chat e,
// como aqui mora apenas o hash, não havia como recuperá-la — o desenho está certo, mas
// a consequência é esta: senha que só existe numa conversa some com a conversa.
const HASH_SENHA =
  "4f694d7a02eef65d24e01a57b1abd8875a50688eed8275a6c27d05af3ada449a";
const CHAVE_SESSAO = "sba-guia-liberado";

async function sha256Hex(texto: string): Promise<string> {
  const dados = new TextEncoder().encode(texto);
  const hash = await crypto.subtle.digest("SHA-256", dados);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const PortaoParceiros = ({ children }: { children: ReactNode }) => {
  const [liberado, setLiberado] = useState(
    () => sessionStorage.getItem(CHAVE_SESSAO) === "1"
  );
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [conferindo, setConferindo] = useState(false);

  if (liberado) return <>{children}</>;

  const conferir = async (e: FormEvent) => {
    e.preventDefault();
    setConferindo(true);
    const ok = (await sha256Hex(senha.trim())) === HASH_SENHA;
    setConferindo(false);
    if (ok) {
      sessionStorage.setItem(CHAVE_SESSAO, "1");
      setLiberado(true);
    } else {
      setErro(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          SBA Negócios
        </p>
        <h1 className="mt-2 text-2xl font-bold text-foreground">
          Material de parceiros
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Este guia é reservado a parceiros e clientes em conversa com a SBA.
          Digite a senha que você recebeu.
        </p>
        <form onSubmit={conferir} className="mt-6 space-y-3">
          <input
            type="password"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              setErro(false);
            }}
            placeholder="Senha de acesso"
            autoFocus
            className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/40 focus:ring-2"
          />
          {erro && (
            <p className="text-sm text-destructive">
              Senha incorreta. Confira com quem te enviou o link.
            </p>
          )}
          <button
            type="submit"
            disabled={conferindo || senha.trim().length === 0}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {conferindo ? "Conferindo…" : "Entrar"}
          </button>
        </form>
        <p className="mt-5 text-xs text-muted-foreground">
          Não tem a senha? Fale com seu contato na SBA —{" "}
          <a className="underline" href="/contato">
            página de contato
          </a>
          .
        </p>
      </div>
    </div>
  );
};
