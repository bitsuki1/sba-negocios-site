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
  privado: { src: imgPrivado, alt: "Aproveitamento de resíduos para a indústria" },
};

// Por que confiar na SBA — princípios que valem para TODAS as frentes
// (não são promessas de um só produto).
const PROVAS = [
  {
    icon: ShieldCheck,
    titulo: "Rigor que se demonstra",
    texto:
      "Toda proposta que apresentamos vem de documentos, números oficiais e análise técnica — o mesmo cuidado em tudo o que fazemos, da recuperação de impostos aos projetos de lixo, energia e obras.",
  },
  {
    icon: FileSearch,
    titulo: "Você pode conferir cada conta",
    texto:
      "Usamos dados públicos e um jeito de trabalhar que qualquer um pode checar. Do estudo de impostos à análise de um projeto, você vê de onde saiu cada número.",
  },
  {
    icon: Network,
    titulo: "A SBA junta todos os envolvidos por você",
    texto:
      "Você não precisa gerenciar dez fornecedores. A SBA monta o projeto e reúne advogado, engenheiro e tecnologia num só lugar — e quem faz o serviço é sempre um parceiro de confiança.",
  },
  {
    icon: HandCoins,
    titulo: "Baixo risco para começar",
    texto:
      "O primeiro passo pesa pouco: na recuperação de impostos, você só paga sobre o que realmente recuperar; nos outros projetos, começamos com uma análise antes de qualquer compromisso.",
  },
];

const Home = () => {
  return (
    <Layout>
      <Hero
        eyebrow="SBA Negócios"
        titulo="Criamos e viabilizamos projetos para prefeituras e empresas."
        subtitulo="A SBA cria e monta projetos para prefeituras e empresas — com a parte jurídica, técnica e de tecnologia já resolvidas, sem que você tenha que amarrar cada pedaço. Da recuperação de impostos do município ao aproveitamento do lixo, que vira receita."
        ctaPrincipal={{ label: "Falar com a SBA", href: "/contato" }}
        ctaSecundario={{ label: "Ver soluções", href: "/solucoes" }}
        imagem={{
          src: heroHome,
          alt: "A SBA reúne setor público e privado, jurídico, técnico e tecnologia em torno de cada projeto.",
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
              A SBA atende dois públicos. Escolha o seu para ver as soluções.
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
              A SBA cuida da coordenação — você conversa com um interlocutor só.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Funcionamos como um ponto central: trazemos a oportunidade,
              organizamos o que precisa ser resolvido e ligamos a prefeitura ou a
              empresa às empresas parceiras que fazem o serviço na prática. Quem
              opera a usina, planta a floresta ou instala os painéis solares é o
              parceiro especializado — o nosso papel é fazer o projeto acontecer
              e manter tudo coordenado.
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
              Quem transforma o lixo em receita é uma parceira especializada: a
              SBA traz e coordena o projeto; a CSTR projeta, instala e opera a
              usina.
            </p>
          </div>

          {/* Fatos e marcos divulgados pelo parceiro CSTR */}
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-border bg-card md:grid md:grid-cols-2">
            <img
              src={imgCstrPlanta}
              alt="Usina de tratamento de resíduos da CSTR"
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
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                    Quanto de lixo urbano cada usina processa por dia — o tamanho
                    se adapta à cidade.
                  </p>
                </div>
                <div>
                  <p className="font-display text-base font-bold text-primary">
                    Startup do ano
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Prêmio recebido pela parceira CSTR (Troféu Frotas &amp; Fretes
                    Verdes 2025).
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
        texto="Conte o seu caso. Na recuperação de impostos, trabalhamos com dados públicos e você só paga se e quando o dinheiro entrar; nos outros projetos, começamos por uma análise gratuita antes de qualquer compromisso."
        botao={{ label: "Falar com a SBA", href: "/contato" }}
      />
    </Layout>
  );
};

export default Home;
