import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, FileSearch, HandCoins, Network } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SETORES, solucoesPorSetor, PARCEIRO_CSTR, type Setor } from "@/data/site";
import cstrLogo from "@/assets/cstr/cstr-logo.png";
import heroHome from "@/assets/hero-home.png";
import imgPublico from "@/assets/conaid/estrada.jpg";
import imgPrivado from "@/assets/cstr/circular.jpg";
import imgCstrPlanta from "@/assets/cstr/planta-biogas.jpg";

// Imagem de abertura de cada "porta" (setor)
const IMAGEM_SETOR: Record<Setor, { src: string; alt: string }> = {
  publico: { src: imgPublico, alt: "Infraestrutura e obras públicas" },
  privado: { src: imgPrivado, alt: "Valorização de resíduos para a indústria" },
};

// Por que confiar na SBA — princípios que valem para TODAS as frentes
// (não são promessas de um só produto).
const PROVAS = [
  {
    icon: ShieldCheck,
    titulo: "Rigor que se comprova",
    texto:
      "O mesmo padrão do nosso trabalho tributário — que parte de uma decisão definitiva do STF (Tema 1130) — guia todas as frentes: cada proposta nasce de fonte, dado e fundamento.",
  },
  {
    icon: FileSearch,
    titulo: "Método auditável",
    texto:
      "Trabalhamos com dado público e um método que pode ser conferido. Do estudo da sua cidade ao diagnóstico de um projeto, você entende de onde vem cada número.",
  },
  {
    icon: Network,
    titulo: "A SBA orquestra as pontas",
    texto:
      "Você não gerencia dez fornecedores. Originamos o projeto e conectamos jurídico, técnico e tecnologia — e quem executa é sempre um parceiro de referência.",
  },
  {
    icon: HandCoins,
    titulo: "Baixo risco para começar",
    texto:
      "O primeiro passo pesa pouco: no tributário, honorários apenas no êxito; nas demais frentes, um diagnóstico antes de qualquer compromisso.",
  },
];

const Home = () => {
  return (
    <Layout>
      <Hero
        eyebrow="SBA Negócios"
        titulo="Estruturamos negócios para o setor público e privado."
        subtitulo="A SBA origina e estrutura projetos para prefeituras e empresas — com o jurídico, o técnico e a tecnologia já montados, sem você ter que resolver cada parte separada. Da recuperação tributária do município à valorização de resíduos."
        ctaPrincipal={{ label: "Falar com a SBA", href: "/contato" }}
        ctaSecundario={{ label: "Ver soluções", href: "/solucoes" }}
        imagem={{
          src: heroHome,
          alt: "A SBA conecta setor público e privado, jurídico, técnico e tecnologia em torno de cada projeto.",
        }}
      />

      {/* Duas portas — por setor */}
      <section className="bg-background">
        <div className="container-sba py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Por onde você começa
            </h2>
            <p className="mt-4 text-muted-foreground">
              A SBA atua em duas frentes, com soluções organizadas para quem
              decide. Identifique o seu perfil.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SETORES.map((setor) => {
              const exemplos = solucoesPorSetor(setor.id).slice(0, 4);
              return (
                <Card
                  key={setor.id}
                  className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md"
                >
                  <img
                    src={IMAGEM_SETOR[setor.id].src}
                    alt={IMAGEM_SETOR[setor.id].alt}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <CardHeader>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold-foreground">
                      {setor.publico}
                    </p>
                    <CardTitle className="mt-1 text-2xl text-primary-dark">
                      {setor.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="leading-relaxed text-muted-foreground">
                      {setor.resumo}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {exemplos.map((s) => (
                        <li
                          key={s.id}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary-dark"
                        >
                          {s.titulo}
                        </li>
                      ))}
                    </ul>
                    <div className="flex-1" />
                    <Link
                      to={setor.href}
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark"
                    >
                      Ver soluções para {setor.titulo.toLowerCase()}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prova de seriedade */}
      <section className="bg-secondary/50">
        <div className="container-sba py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Por que confiar na SBA
            </h2>
            <p className="mt-4 text-muted-foreground">
              Os mesmos princípios valem para tudo o que fazemos — da recuperação
              tributária aos projetos de resíduos, energia e infraestrutura.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROVAS.map((prova) => {
              const Icone = prova.icon;
              return (
                <div
                  key={prova.titulo}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-primary-dark">
                    {prova.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {prova.texto}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hub Conector */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              A SBA orquestra — você não gerencia dez fornecedores.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Funcionamos como um hub: originamos o projeto, organizamos o
              problema e ligamos prefeitura ou empresa aos operadores e às
              tecnologias parceiras que executam. Quem opera a usina, planta a
              floresta ou instala a usina solar é o parceiro especializado — o
              nosso papel é fazer o projeto acontecer e manter tudo coordenado.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/solucoes"
                className="inline-flex items-center justify-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                Conhecer todas as soluções
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Parceiro de tecnologia — CSTR em destaque */}
      <section className="border-t border-border bg-secondary/50">
        <div className="container-sba py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Tecnologia e execução
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary-dark">
              Nos resíduos, a SBA trabalha com a CSTR
            </h2>
            <p className="mt-4 text-muted-foreground">
              Quem transforma resíduo em valor é um parceiro de referência: a SBA
              origina e coordena o projeto; a CSTR projeta, implanta e opera a
              tecnologia.
            </p>
          </div>

          {/* Fatos e marcos divulgados pelo parceiro CSTR */}
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-border bg-card md:grid md:grid-cols-2">
            <img
              src={imgCstrPlanta}
              alt="Planta de tratamento e valorização de resíduos da CSTR"
              className="h-56 w-full object-cover md:h-full"
              loading="lazy"
            />
            <div className="p-7 md:p-8">
              <img
                src={cstrLogo}
                alt="CSTR — Centro Sustentável de Tratamento de Resíduos"
                className="h-10 w-auto"
                loading="lazy"
              />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {PARCEIRO_CSTR.chamada}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div>
                  <p className="font-display text-base font-bold text-primary">
                    {PARCEIRO_CSTR.projeto.local}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {PARCEIRO_CSTR.projeto.titulo} — {PARCEIRO_CSTR.projeto.status}
                  </p>
                </div>
                <div>
                  <p className="font-display text-base font-bold text-primary">
                    50–300 t/dia
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Capacidade das plantas de resíduos sólidos urbanos (modular e
                    escalável).
                  </p>
                </div>
                <div>
                  <p className="font-display text-base font-bold text-primary">
                    Startup do ano
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Reconhecimento da CSTR para a Indústria 4.0.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Marcos e dados técnicos divulgados pelo parceiro CSTR.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SecaoCTA
        titulo="Quer saber por onde a sua cidade ou empresa pode começar?"
        texto="Conte o seu caso. No tributário, dado público e honorários só no êxito; nas demais frentes, um diagnóstico antes de qualquer compromisso."
        botao={{ label: "Falar com a SBA", href: "/contato" }}
      />
    </Layout>
  );
};

export default Home;
