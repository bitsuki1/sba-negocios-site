import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { FormularioContato } from "@/components/FormularioContato";
import { Handshake, Scale, Users } from "lucide-react";
import heroParceiro from "@/assets/fotos/parceria.jpg";

const PERFIS = [
  {
    icon: Scale,
    titulo: "Parceiros técnicos e jurídicos",
    texto:
      "Especialistas que dão sustentação aos projetos — da engenharia ao direito público.",
  },
  {
    icon: Handshake,
    titulo: "Operadores e tecnologia",
    texto:
      "Quem executa a solução em campo e quem traz a tecnologia que viabiliza cada frente.",
  },
  {
    icon: Users,
    titulo: "Representantes",
    texto:
      "Pessoas com relacionamento e capacidade de originar projetos junto a municípios e empresas.",
  },
];

const SejaParceiro = () => {
  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Rede de parceiros"
        titulo="Seja um parceiro da SBA Negócios."
        subtitulo="A SBA trabalha com uma rede de parceiros técnicos, jurídicos, operadores e representantes. Se você quer somar com a gente nos nossos projetos, conte como pode contribuir."
        imagem={{
          src: heroParceiro,
          alt: "Rede de parceiros que executam os projetos da SBA.",
        }}
      />

      {/* O que a SBA oferece ao parceiro */}
      <section className="border-b border-border bg-secondary/50">
        <div className="container-sba py-14 md:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              O que você ganha na rede da SBA
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Projetos já originados",
                d: "A SBA leva a demanda pronta e estruturada (prefeitura ou empresa). Você entra na sua especialidade, sem precisar prospectar.",
              },
              {
                t: "Relação clara, por escrito",
                d: "Papéis, escopo e remuneração são definidos caso a caso e sempre por escrito antes de começar — nada combinado no ar.",
              },
              {
                t: "Você executa, a SBA coordena",
                d: "A SBA organiza o projeto e conecta as pontas; você foca no que faz de melhor, sem gerenciar dez fornecedores.",
              },
            ].map((it) => (
              <div
                key={it.t}
                className="rounded-lg border border-border bg-card p-7"
              >
                <h3 className="font-display text-lg font-semibold text-primary-dark">
                  {it.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {it.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            {/* Perfis */}
            <div>
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-2xl font-bold text-primary-dark">
                Quem buscamos
              </h2>
              <p className="mt-4 text-muted-foreground">
                Cada projeto da SBA junta diferentes competências. Veja onde você
                pode entrar.
              </p>

              <div className="mt-8 space-y-5">
                {PERFIS.map((perfil) => {
                  const Icone = perfil.icon;
                  return (
                    <div key={perfil.titulo} className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icone className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-semibold text-primary-dark">
                          {perfil.titulo}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {perfil.texto}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Formulário */}
            <div className="rounded-lg border border-border bg-secondary/30 p-7 md:p-8">
              <h2 className="font-display text-xl font-semibold text-primary-dark">
                Candidate-se à rede
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Preencha os campos abaixo. Analisamos cada candidatura e
                retornamos em até 2 dias úteis para uma conversa inicial.
              </p>
              <div className="mt-6">
                <FormularioContato variante="parceiro" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SejaParceiro;
