import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { CardSolucao } from "@/components/CardSolucao";
import { FaixaDesafios } from "@/components/FaixaDesafios";
import { FaixaConfianca } from "@/components/FaixaConfianca";
import { solucoesPorSetor } from "@/data/site";
import heroPrivado from "@/assets/fotos/residuos-industria.jpg";

const SetorPrivado = () => {
  const solucoes = solucoesPorSetor("privado");

  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Setor Privado · Empresas, indústria e saúde"
        titulo="Resíduo deixa de ser passivo e vira solução."
        subtitulo="Para grandes geradores e para o setor hospitalar, a SBA estrutura a destinação e a valorização dos resíduos com conformidade legal, rastreabilidade e parceiros que operam — sem que a sua empresa precise virar especialista no assunto."
        ctaPrincipal={{ label: "Falar com a SBA", href: "/contato" }}
        imagem={{
          src: heroPrivado,
          alt: "Resíduo industrial destinado e valorizado com rastreabilidade.",
        }}
      />

      <FaixaDesafios setor="privado" />

      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Soluções para empresas e geradores
            </h2>
            <p className="mt-4 text-muted-foreground">
              Indústria, comércio, agro e saúde. A SBA monta o arranjo e conecta
              a tecnologia e o operador certos para cada tipo de resíduo.
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
        titulo="Tem um volume de resíduo que hoje é só custo e risco?"
        texto="Comece por um diagnóstico. A partir dele, decidimos juntos o melhor caminho de destinação e valorização — com valores sob consulta."
        botao={{ label: "Conversar sobre o resíduo que gero", href: "/contato" }}
      />
    </Layout>
  );
};

export default SetorPrivado;
