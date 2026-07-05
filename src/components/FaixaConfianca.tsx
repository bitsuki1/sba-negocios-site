import { ShieldCheck, FileSearch, Network, HandCoins, type LucideIcon } from "lucide-react";

// "Por que confiar na SBA" — os mesmos pilares da home, válidos para TODAS as
// frentes (não são promessas de um só produto). Reaproveitado nas páginas de setor.
const PILARES: { icon: LucideIcon; titulo: string; texto: string }[] = [
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

export const FaixaConfianca = () => {
  return (
    <section className="border-t border-border bg-secondary/50">
      <div className="container-sba py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 rule-gold" />
          <h2 className="font-display text-3xl font-bold text-primary-dark">
            Por que confiar na SBA
          </h2>
          <p className="mt-4 text-muted-foreground">
            Os mesmos princípios valem para tudo o que fazemos — da recuperação
            de impostos aos projetos de resíduos, energia e obras.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES.map((pilar) => {
            const Icone = pilar.icon;
            return (
              <div
                key={pilar.titulo}
                className="rounded-lg border border-border bg-card p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icone className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary-dark">
                  {pilar.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pilar.texto}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
