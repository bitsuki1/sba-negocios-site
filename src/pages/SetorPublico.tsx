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
        subtitulo="Para prefeituras e consórcios, a SBA recupera receita que já pertence ao município, organiza o descarte correto do lixo urbano e tira do papel projetos de energia e obras — sempre com dados públicos e contas que você pode conferir."
        ctaPrincipal={{ label: "Solicitar uma análise", href: "/contato" }}
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
              Do tributário à infraestrutura. A SBA organiza o projeto e chama
              os parceiros que fazem o serviço — e o município decide em cada etapa.
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
        titulo="Quer saber quanto a sua cidade tem para recuperar — ou quais projetos consegue tirar do papel?"
        texto="Comece pela recuperação tributária (dado público, você só paga sobre o que for de fato recuperado) ou por uma análise de lixo, energia ou obras — sem compromisso, e todo o ganho fica com o município."
        botao={{ label: "Solicitar estudo da minha cidade", href: "/contato" }}
      />
    </Layout>
  );
};

export default SetorPublico;
