import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { CardSolucao } from "@/components/CardSolucao";
import { FaixaConfianca } from "@/components/FaixaConfianca";
import { cn } from "@/lib/utils";
import { TEMAS, solucoesPorTema, type Setor } from "@/data/site";
import heroSolucoes from "@/assets/fotos/infraestrutura.jpg";

const SUBTITULO_TEMA: Record<string, string> = {
  "Recuperação Tributária": "Receita que já é do município, de volta ao caixa.",
  "Resíduos & Aproveitamento":
    "Do lixo da cidade ao lixo de hospital — descarte dentro da lei e receita a partir do que hoje só dá despesa.",
  "Energia & Eficiência": "Conta de luz menor para os prédios e serviços da cidade.",
  Ambiental: "Recuperar áreas degradadas, tratar água e gerar receita com a venda de crédito de carbono.",
  Infraestrutura: "Materiais e técnicas que deixam as obras da cidade mais duráveis e resistentes.",
  Cultura: "Projetos culturais que saem do papel, com a busca de patrocínio já organizada.",
};

type Filtro = "todos" | Setor;

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "todos", label: "Todas" },
  { id: "publico", label: "Setor Público" },
  { id: "privado", label: "Setor Privado" },
];

const Solucoes = () => {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Soluções"
        titulo="O que a SBA pode fazer pela sua cidade ou pela sua empresa."
        subtitulo="Aqui está tudo o que a SBA faz, organizado por área. Em cada serviço você vê o que a sua cidade ou empresa ganha. Nas áreas de meio ambiente e de infraestrutura, o preço depende de cada caso — montamos um orçamento para a sua situação. Já na recuperação de impostos, você recebe uma estimativa do mínimo a recuperar e só paga sobre o que for de fato recuperado."
        ctaPrincipal={{ label: "Falar com a SBA", href: "/contato" }}
        imagem={{
          src: heroSolucoes,
          alt: "Malha viária conectando pontas — o portfólio da SBA para o setor público e privado.",
        }}
      />

      {/* Filtro por setor */}
      <section className="border-b border-border bg-background">
        <div className="container-sba flex flex-wrap items-center gap-3 py-6">
          <span className="text-sm font-medium text-muted-foreground">
            Filtrar por:
          </span>
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              aria-pressed={filtro === f.id}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                filtro === f.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-primary-dark hover:bg-secondary"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {TEMAS.map((tema, i) => {
        const solucoes = solucoesPorTema(tema).filter(
          (s) => filtro === "todos" || s.setores.includes(filtro)
        );
        if (solucoes.length === 0) return null;
        return (
          <section
            key={tema}
            className={i % 2 === 0 ? "bg-background" : "bg-secondary/50"}
          >
            <div className="container-sba py-14 md:py-16">
              <div className="max-w-2xl">
                <div className="rule-gold mb-4" />
                <h2 className="font-display text-2xl font-bold text-primary-dark md:text-3xl">
                  {tema}
                </h2>
                {SUBTITULO_TEMA[tema] && (
                  <p className="mt-3 text-muted-foreground">
                    {SUBTITULO_TEMA[tema]}
                  </p>
                )}
              </div>

              <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {solucoes.map((s) => (
                  <CardSolucao key={s.id} solucao={s} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <FaixaConfianca />

      <SecaoCTA
        titulo="Não sabe por onde começar?"
        texto="Conte o seu caso — município ou empresa — e a SBA indica o melhor primeiro passo, sem compromisso."
        botao={{ label: "Falar com a SBA", href: "/contato" }}
      />
    </Layout>
  );
};

export default Solucoes;
