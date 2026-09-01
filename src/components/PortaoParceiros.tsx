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
// senha que só existe numa conversa some com a conversa.
// 2026-08-26: aconteceu de novo — o dono pediu a senha e ela não existia mais em
// lugar algum (só o hash mora aqui, e SHA-256 não tem volta). Como estava perdida
// para TODOS, o portão já estava de fato revogado: definir uma nova não tirou
// acesso de ninguém. A nova senha foi entregue ao dono e deve viver no GERENCIADOR
// DE SENHAS dele — não no git, não no chat, não num documento. Só ASCII, de
// propósito: senha com acento quebra na digitação e o hash não bate.
// segredo-ok — NAO e credencial: e o SHA-256 (hash, mao unica) da senha do portao.
// A varredura de segredos acusa "token hexadecimal de 64 caracteres perto de rotulo
// de credencial" e, aqui, isso e o desenho CERTO: o que mora no git e o hash, e hash
// nao volta a ser senha. A senha em si vive no gerenciador de senhas do dono.
// (Marcado pelo Escritorio do MOU em 2026-09-01, ao instalar a porta de segredos —
//  porteiro que acusa sempre e porteiro que alguem desliga.)
const HASH_SENHA =
  "eb2ab3e2ef4132f40833e26e0bb92534e362755a1fd46241ff231e7c574b759d";  // segredo-ok
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
