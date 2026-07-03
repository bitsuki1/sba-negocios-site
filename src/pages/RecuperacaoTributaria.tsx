import { Check } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { PASSOS_TRIBUTARIO } from "@/data/site";
import heroTributario from "@/assets/fotos/tributario.jpg";

const HONESTIDADE = [
  "Os honorários são 100% no êxito: você paga apenas sobre o que for de fato recuperado.",
  "Nenhum custo antecipado para fazer o estudo da sua cidade.",
  "O valor apresentado é um piso estimado — trabalhamos com estimativa, não com promessa de resultado.",
  "A confirmação documento a documento acontece na fase seguinte, com o acompanhamento da SBA.",
  "Todo o trabalho parte de dado público e de um método que pode ser auditado.",
];

const RecuperacaoTributaria = () => {
  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Recuperação Tributária · Tema 1130 do STF"
        titulo="O IRRF retido pelo município é do município."
        subtitulo="O STF decidiu, em definitivo, que o Imposto de Renda Retido na Fonte (IRRF) descontado nos pagamentos do município aos seus fornecedores pertence ao próprio município — e não à União. A SBA ajuda a sua cidade a recuperar e a passar a receber o que é dela."
        ctaPrincipal={{
          label: "Solicitar estudo da minha cidade",
          href: "/contato",
        }}
        imagem={{
          src: heroTributario,
          alt: "IRRF retido pelo município pertence ao município (STF, Tema 1130).",
        }}
      />

      {/* O que mudou (didático) */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                O que o STF decidiu, em linguagem simples
              </h2>
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>
                  Quando a prefeitura paga um fornecedor, parte do valor é retida a
                  título de Imposto de Renda (o IRRF). A dúvida era: esse dinheiro
                  fica com o município ou vai para a União?
                </p>
                <p>
                  No Tema 1130, o Supremo Tribunal Federal definiu que esse valor é
                  do próprio município. Ou seja: o que foi retido nos últimos anos
                  pode ser recuperado, e o que será retido daqui pra frente passa a
                  ficar com a cidade.
                </p>
                <p>
                  A SBA levanta, a partir das contas públicas, uma estimativa de
                  quanto há a recuperar dos últimos 5 anos e de quanto o município
                  passa a ganhar a partir de agora.
                </p>
              </div>
            </div>

            {/* Bloco honestidade */}
            <div className="rounded-lg border border-border bg-secondary/40 p-7">
              <h3 className="font-display text-xl font-semibold text-primary-dark">
                Como falamos sobre isso (com honestidade)
              </h3>
              <ul className="mt-5 space-y-3">
                {HONESTIDADE.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona em 3 passos */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Como funciona, em 3 passos
            </h2>
            <p className="mt-4 text-muted-foreground">
              Um caminho claro, sem custo antecipado e sem letra miúda.
            </p>
          </div>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {PASSOS_TRIBUTARIO.map((passo) => (
              <li
                key={passo.numero}
                className="relative rounded-lg border border-border bg-card p-7"
              >
                <span className="font-display text-4xl font-bold text-gold">
                  {passo.numero}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-primary-dark">
                  {passo.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {passo.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-7">
              <h3 className="font-display text-xl font-semibold text-primary-dark">
                Segurança jurídica
              </h3>
              <p className="mt-3 text-muted-foreground">
                O direito do município nasce de uma decisão definitiva do STF. Não
                dependemos de uma tese em discussão: partimos do que já está
                decidido, com o estudo conduzido por advogados e contadores
                especializados.
              </p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-7">
              <h3 className="font-display text-xl font-semibold text-primary-dark">
                Dever de boa gestão fiscal
              </h3>
              <p className="mt-3 text-muted-foreground">
                A boa gestão fiscal — princípio da Lei de Responsabilidade
                Fiscal — pede que o gestor zele pelas receitas do município.
                Recuperar o IRRF que pertence a ele não é só oportunidade: é
                cuidar bem do dinheiro público.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perguntas frequentes */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="rule-gold mb-5" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Perguntas frequentes
            </h2>
            <dl className="mt-10 divide-y divide-border">
              {[
                {
                  q: "Isso é seguro juridicamente?",
                  a: "Sim. Parte de uma decisão definitiva do STF (Tema 1130, RE 1.293.453). Não é uma tese em discussão: é o que a Corte já decidiu.",
                },
                {
                  q: "Quanto custa para o município?",
                  a: "Nada antecipado. Os honorários são 100% no êxito — cobrados apenas sobre o que for de fato recuperado.",
                },
                {
                  q: "De onde vem o valor apresentado?",
                  a: "De dado público das contas do município e de um método que pode ser auditado. É sempre um piso estimado, confirmado documento a documento na fase seguinte.",
                },
                {
                  q: "Quem faz a apuração documental?",
                  a: "A apuração documental final acontece na Receita (e-CAC), com a orientação e o acompanhamento da SBA em cada etapa.",
                },
                {
                  q: "Como a prefeitura contrata a SBA legalmente?",
                  a: "A contratação segue a legislação de licitações e contratos (Lei 14.133/2021), no modelo adequado a cada município. A remuneração no êxito é definida em contrato, sobre o valor efetivamente recuperado — sem despesa prévia no orçamento. A SBA apoia a procuradoria com toda a fundamentação.",
                },
                {
                  q: "A Câmara ou o Tribunal de Contas podem questionar?",
                  a: "Trata-se de recuperar receita própria do município, com base em decisão definitiva do STF e método auditável. Deixar de buscar receita que pertence ao município é que contraria o dever de boa gestão fiscal. Todo o trabalho é documentado para a prestação de contas ao TCE.",
                },
                {
                  q: "Recuperar isso é boa gestão?",
                  a: "Sim. Zelar pelas receitas próprias do município é dever de boa gestão fiscal — recuperar o IRRF que é dele é aderente a esse dever.",
                },
                {
                  q: "Quanto tempo leva?",
                  a: "O estudo inicial é rápido. A recuperação costuma ser buscada pela via administrativa (na Receita, pelo e-CAC); o caminho e o prazo exatos variam caso a caso. E o que deixa de ser retido daqui em diante passa a ficar com a cidade desde cedo — nada prometido sem base.",
                },
              ].map((item) => (
                <div key={item.q} className="py-5">
                  <dt className="font-display text-lg font-semibold text-primary-dark">
                    {item.q}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-muted-foreground">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <SecaoCTA
        titulo="Solicite o estudo da sua cidade"
        texto="Sem custo antecipado. Você recebe uma estimativa de piso e o método utilizado, para decidir com clareza."
        botao={{ label: "Solicitar estudo da minha cidade", href: "/contato" }}
      />
    </Layout>
  );
};

export default RecuperacaoTributaria;
