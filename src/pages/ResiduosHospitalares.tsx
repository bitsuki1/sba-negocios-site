import { Flame, FlaskConical, Check, ShieldCheck, ExternalLink } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { PARCEIRO_CSTR } from "@/data/site";
import hospitalarImg from "@/assets/cstr/hospitalar.jpg";
import incineradorImg from "@/assets/cstr/incinerador.jpg";
import neomagImg from "@/assets/cstr/neomag.jpg";

const DESAFIOS_RSS = [
  "Resíduo infectante e de alto risco sanitário",
  "Custos de transporte e destinação elevados",
  "Forte dependência de empresas terceirizadas",
  "Exigências regulatórias e de rastreabilidade",
];

const TECNOLOGIAS = [
  {
    icon: Flame,
    img: incineradorImg,
    nome: "Incinerador de resíduos hospitalares",
    status: "Em operação",
    capacidade: "180 a 200 kg/dia",
    pontos: [
      "Incineração em alta temperatura (até 1200 °C), com dupla câmara de combustão",
      "Destruição segura de resíduos infectantes, no próprio local de geração",
      "Menos transporte, menos dependência de terceiros e operação de fácil manutenção",
    ],
  },
  {
    icon: FlaskConical,
    img: neomagImg,
    nome: "NEOMAG — neotermólise óxido-magnética",
    status: "Em desenvolvimento (PD&I)",
    capacidade: "até 2 t/dia",
    pontos: [
      "Tecnologia de decomposição termo-magnética (plasma frio por força magnética)",
      "Reduz até 90% da massa e elimina agentes biológicos, químicos e físicos",
      "Sistema compacto, sem combustível fóssil e com baixa emissão de poluentes",
    ],
  },
];

const DIFERENCIAL = [
  "Minimiza riscos de investimento",
  "Adapta a tecnologia à realidade do hospital",
  "Gera dados técnicos reais para a tomada de decisão",
  "Estrutura uma solução personalizada",
  "Posiciona o hospital como protagonista em inovação",
];

const ResiduosHospitalares = () => {
  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Setor Privado · Saúde"
        titulo="Resíduo de saúde tratado com segurança, perto de onde é gerado."
        subtitulo="Para hospitais, clínicas e laboratórios, a SBA estrutura o tratamento de resíduos de serviços de saúde (RSS) com a tecnologia do parceiro CSTR — da destruição segura do material infectante à inovação que reduz volume e dependência de terceiros."
        ctaPrincipal={{ label: "Falar com a SBA", href: "/contato" }}
      />

      {/* O desafio + imagem */}
      <section className="border-b border-border bg-secondary/50">
        <div className="container-sba py-14 md:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <img
              src={hospitalarImg}
              alt="Manejo de resíduos de serviços de saúde (RSS)"
              className="h-64 w-full rounded-lg object-cover md:h-80"
              loading="lazy"
            />
            <div>
              <div className="rule-gold mb-4" />
              <h2 className="font-display text-2xl font-bold text-primary-dark md:text-3xl">
                O desafio do RSS
              </h2>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {DESAFIOS_RSS.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-foreground" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Duas tecnologias */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Duas tecnologias da {PARCEIRO_CSTR.nome}
            </h2>
            <p className="mt-4 text-muted-foreground">
              Uma solução já em operação e uma frente de inovação. A SBA estrutura
              o projeto; a {PARCEIRO_CSTR.nome} traz a tecnologia.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {TECNOLOGIAS.map((t) => {
              const Icone = t.icon;
              const ehPDI = t.status.includes("PD&I");
              return (
                <div
                  key={t.nome}
                  className="flex flex-col overflow-hidden rounded-lg border border-border bg-card"
                >
                  <img
                    src={t.img}
                    alt={t.nome}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-primary">
                      <Icone className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span
                      className={
                        ehPDI
                          ? "rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold-foreground"
                          : "rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent"
                      }
                    >
                      {t.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-primary-dark">
                    {t.nome}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {t.capacidade}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {t.pontos.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Tecnologias do parceiro {PARCEIRO_CSTR.nome}. A NEOMAG está em fase de
            pesquisa e desenvolvimento (PD&I); capacidades e valores por projeto,
            sob consulta.
          </p>
        </div>
      </section>

      {/* Diferencial do modelo */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                Um modelo que tira o risco da frente
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Em vez de uma compra de risco, o tratamento é estruturado como um
                projeto: primeiro valida na realidade do hospital, gera dados
                reais e só então avança para a escala. Assim a decisão é segura.
              </p>
              <a
                href={PARCEIRO_CSTR.site}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                Conhecer a {PARCEIRO_CSTR.nome}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <ul className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-7">
              {DIFERENCIAL.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/90">
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Rastreabilidade e conformidade */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Rastreabilidade e conformidade
            </h2>
            <p className="mt-4 text-muted-foreground">
              O que a instituição de saúde precisa para decidir com segurança:
              cada etapa documentada e dentro da norma.
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {[
              "Manifesto de Transporte de Resíduos (MTR) e Certificado de Destinação Final que comprovam o caminho do resíduo, do recolhimento à destinação.",
              "Alinhamento ao PGRSS da instituição e à RDC ANVISA 222/2018.",
              "Solução implantada com licenciamento ambiental e sanitário, sob responsabilidade do operador parceiro — a SBA estrutura essa parte no projeto.",
              "A SBA reduz o risco conectando um operador devidamente licenciado e garantindo a cadeia documental — sem prometer que a corresponsabilidade do gerador desaparece.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-foreground/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SecaoCTA
        titulo="Sua instituição de saúde quer tratar o RSS com mais segurança e menos custo?"
        texto="Fale com a SBA. Estruturamos um projeto sob medida, com a tecnologia certa e valores sob consulta."
        botao={{ label: "Falar com a SBA", href: "/contato" }}
      />
    </Layout>
  );
};

export default ResiduosHospitalares;
