import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { CardSolucao } from "@/components/CardSolucao";
import { FaixaDesafios } from "@/components/FaixaDesafios";
import { FaixaConfianca } from "@/components/FaixaConfianca";
import { solucoesPorSetor } from "@/data/site";
import heroPublico from "@/assets/fotos/cidade.jpg";

const SetorPublico = () => {
  const solucoes = solucoesPorSetor("publico");

  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Setor Público · Prefeituras & Consórcios"
        titulo="Mais receita, menos custo e projetos que saem do papel."
        subtitulo="Para prefeituras e consórcios, a SBA recupera receita que é do município, estrutura a destinação dos resíduos urbanos e destrava projetos de energia e infraestrutura — sempre com dado público e método auditável."
        ctaPrincipal={{ label: "Solicitar um diagnóstico", href: "/contato" }}
        imagem={{
          src: heroPublico,
          alt: "A SBA destrava receita e projetos para o município.",
        }}
      />

      <FaixaDesafios setor="publico" />

      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Soluções para o município
            </h2>
            <p className="mt-4 text-muted-foreground">
              Do tributário à infraestrutura. A SBA organiza o projeto e conecta
              os parceiros que executam — o município decide a cada etapa.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solucoes.map((s) => (
              <CardSolucao key={s.id} solucao={s} mostrarTema />
            ))}
          </div>
        </div>
      </section>

      <FaixaConfianca />

      <SecaoCTA
        titulo="Quer saber quanto a sua cidade tem a recuperar — ou destravar?"
        texto="Comece pela recuperação tributária (dado público, honorários só no êxito) ou por um diagnóstico de resíduos, energia ou infraestrutura — sem compromisso, e o resultado é seu."
        botao={{ label: "Solicitar estudo da minha cidade", href: "/contato" }}
      />
    </Layout>
  );
};

export default SetorPublico;
