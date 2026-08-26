import { useParams, Navigate, Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { LANDINGS, PROCESSO_SBA } from "@/data/landings";
import type { Landing } from "@/data/landings";
import { FaixaConfianca } from "@/components/FaixaConfianca";

/**
 * Renderiza uma landing orientada a dados.
 * `mapa` permite reusar este mesmo componente para outro conjunto de páginas
 * (ex.: as sub-páginas de /residuos) SEM que o mesmo conteúdo passe a existir
 * em dois endereços — cada mapa é lido por uma rota só. Ver LANDINGS_RESIDUOS.
 */
interface PaginaSolucaoProps {
  mapa?: Record<string, Landing>;
  /** Para onde mandar quem chegar com um slug inexistente. */
  voltarPara?: string;
}

const PaginaSolucao = ({
  mapa = LANDINGS,
  voltarPara = "/solucoes",
}: PaginaSolucaoProps) => {
  const { slug } = useParams();
  const dados = slug ? mapa[slug] : undefined;

  if (!dados) return <Navigate to={voltarPara} replace />;

  return (
    <Layout>
      <Hero
        compacto
        eyebrow={dados.eyebrow}
        titulo={dados.titulo}
        subtitulo={dados.subtitulo}
        ctaPrincipal={{ label: "Falar com a SBA", href: "/contato" }}
        imagem={
          dados.imagem ? { src: dados.imagem, alt: dados.titulo } : undefined
        }
      />

      {/* O que é */}
      <section className="border-b border-border bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="rule-gold mb-5" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              {dados.oQueE.titulo}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
              {dados.oQueE.paragrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              O que você ganha
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dados.beneficios.map((b) => (
              <div
                key={b.titulo}
                className="rounded-lg border border-border bg-card p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15 text-accent">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-primary-dark">
                  {b.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onde se aplica */}
      {dados.aplicacoes && dados.aplicacoes.length > 0 && (
        <section className="bg-background">
          <div className="container-sba py-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-5 rule-gold" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                Onde se aplica
              </h2>
            </div>
            <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
              {dados.aplicacoes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Como funciona */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Como a SBA trabalha, passo a passo
            </h2>
            <p className="mt-4 text-muted-foreground">
              A SBA organiza o projeto e traz o parceiro que vai executar. Cada
              etapa só avança quando faz sentido para você.
            </p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {PROCESSO_SBA.map((p) => (
              <li
                key={p.numero}
                className="rounded-lg border border-border bg-card p-7"
              >
                <span className="font-display text-4xl font-bold text-gold">
                  {p.numero}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-primary-dark">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.texto}
                </p>
              </li>
            ))}
          </ol>

          {dados.parceiro && (
            <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="text-sm text-foreground/90">{dados.parceiro.nota}</p>
              {dados.parceiro.href && (
                <Link
                  to={dados.parceiro.href}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                >
                  Ver detalhes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Perguntas frequentes */}
      {dados.faq && dados.faq.length > 0 && (
        <section className="bg-background">
          <div className="container-sba py-16 md:py-20">
            <div className="mx-auto max-w-3xl">
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                Perguntas frequentes
              </h2>
              <dl className="mt-8 divide-y divide-border">
                {dados.faq.map((item) => (
                  <div key={item.q} className="py-5">
                    <dt className="font-display text-lg font-semibold text-primary-dark">
                      {item.q}
                    </dt>
                    <dd className="mt-2 leading-relaxed text-muted-foreground">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      <FaixaConfianca />

      <SecaoCTA
        titulo={dados.cta.titulo}
        texto={dados.cta.texto}
        botao={{ label: "Falar com a SBA", href: "/contato" }}
      />
    </Layout>
  );
};

export default PaginaSolucao;
