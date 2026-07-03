import { useParams, Navigate, Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { LANDINGS, PROCESSO_SBA } from "@/data/landings";
import { FaixaConfianca } from "@/components/FaixaConfianca";

const PaginaSolucao = () => {
  const { slug } = useParams();
  const dados = slug ? LANDINGS[slug] : undefined;

  if (!dados) return <Navigate to="/solucoes" replace />;

  return (
    <Layout>
      <Hero
        compacto
        eyebrow={dados.eyebrow}
        titulo={dados.titulo}
        subtitulo={dados.subtitulo}
        ctaPrincipal={{ label: "Falar com a SBA", href: "/contato" }}
      />

      {/* O que é */}
      <section className="border-b border-border bg-background">
        <div className="container-sba py-16 md:py-20">
          <div
            className={
              dados.imagem
                ? "grid gap-10 lg:grid-cols-2 lg:items-center"
                : "mx-auto max-w-3xl"
            }
          >
            {dados.imagem && (
              <img
                src={dados.imagem}
                alt=""
                className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
                loading="lazy"
              />
            )}
            <div>
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

      {/* Como funciona */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Como a SBA conduz
            </h2>
            <p className="mt-4 text-muted-foreground">
              A SBA organiza o projeto e conecta quem executa. Cada etapa só
              avança quando faz sentido para você.
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
