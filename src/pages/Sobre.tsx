import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { Button } from "@/components/ui/button";
import { TIME } from "@/data/site";
import heroSobre from "@/assets/fotos/equipe.jpg";

const VALORES = [
  {
    titulo: "Honestidade",
    texto:
      "Falamos com clareza sobre o que é estimativa e o que é certeza. No tributário, é piso estimado e pagamento no êxito — nada de promessa de resultado garantido.",
  },
  {
    titulo: "Simplicidade",
    texto:
      "Explicamos assuntos complexos sem jargão. Se o gestor não entende, não está bem explicado.",
  },
  {
    titulo: "Método",
    texto:
      "Trabalho que pode ser conferido: dado público, critérios claros e cada número com origem rastreável.",
  },
];

const Sobre = () => {
  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Sobre a SBA Negócios"
        titulo="A gestão que conecta as pontas."
        subtitulo="A SBA Negócios é uma empresa de desenvolvimento de negócios e consultoria para os setores público e privado. Atuamos como gestora de projetos: originamos, estruturamos e coordenamos — sem executar a obra diretamente."
        imagem={{
          src: heroSobre,
          alt: "Equipe da SBA analisando dados e indicadores de um projeto.",
        }}
      />

      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="space-y-5 text-muted-foreground">
              <div className="rule-gold" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                O que fazemos (e o que não fazemos)
              </h2>
              <p>
                A SBA conecta as quatro pontas de um projeto: o cliente (prefeitura,
                consórcio ou empresa), o técnico que entende da solução, o jurídico
                que dá segurança e a tecnologia que viabiliza.
              </p>
              <p>
                Originamos e estruturamos projetos. Organizamos o problema,
                desenhamos o caminho e conduzimos as partes até o resultado.
              </p>
              <p>
                <strong className="text-foreground">
                  A SBA não executa obra.
                </strong>{" "}
                Quem opera a usina, planta a floresta ou instala a usina solar é o
                parceiro especializado. O nosso papel é fazer o projeto acontecer e
                manter tudo coordenado.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-secondary/40 p-8">
              <h3 className="font-display text-xl font-semibold text-primary-dark">
                Para quem trabalhamos
              </h3>
              <ul className="mt-5 space-y-4 text-sm text-foreground/90">
                <li>
                  <strong className="text-primary-dark">Setor público</strong> —
                  prefeituras e consórcios que querem recuperar receita e destravar
                  projetos de infraestrutura ambiental.
                </li>
                <li>
                  <strong className="text-primary-dark">Setor privado</strong> —
                  empresas que precisam de estruturação de negócios e de conexão com
                  os atores certos.
                </li>
                <li>
                  <strong className="text-primary-dark">Rede de parceiros</strong> —
                  técnicos, jurídicos, operadores e representantes que somam com a
                  SBA em cada projeto.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Como trabalhamos
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALORES.map((valor) => (
              <div
                key={valor.titulo}
                className="rounded-lg border border-border bg-card p-7"
              >
                <h3 className="font-display text-lg font-semibold text-primary-dark">
                  {valor.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {valor.texto}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/seja-um-parceiro">Quero ser parceiro da SBA</Link>
            </Button>
          </div>
        </div>
      </section>

      {TIME.length > 0 && (
        <section className="bg-background">
          <div className="container-sba py-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-5 rule-gold" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                Quem conduz
              </h2>
              <p className="mt-4 text-muted-foreground">
                As pessoas por trás da SBA.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TIME.map((m) => (
                <div
                  key={m.nome}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  {m.foto && (
                    <img
                      src={m.foto}
                      alt={m.nome}
                      className="h-20 w-20 rounded-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <h3 className="mt-4 font-display text-lg font-semibold text-primary-dark">
                    {m.nome}
                  </h3>
                  <p className="text-sm font-medium text-gold-foreground">
                    {m.cargo}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {m.bio}
                  </p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SecaoCTA
        titulo="Vamos conversar sobre o seu projeto?"
        texto="Conte o que você precisa. A SBA organiza o caminho e conecta quem precisa estar junto."
        botao={{ label: "Falar com a SBA", href: "/contato" }}
      />
    </Layout>
  );
};

export default Sobre;
