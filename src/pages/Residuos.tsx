import { Link } from "react-router-dom";
import { Check, ExternalLink, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { solucoesPorTema, PARCEIRO_CSTR } from "@/data/site";
import residuoValor from "@/assets/cstr/residuo-valor.png";
import plantaBiogas from "@/assets/cstr/planta-biogas.jpg";
import premioImg from "@/assets/cstr/premio.jpg";
import cstrLogo from "@/assets/cstr/cstr-logo.png";
import heroResiduos from "@/assets/cstr/circular.jpg";

const ESTAGIOS = [
  {
    numero: "01",
    titulo: "Primeira leitura (grátis)",
    texto:
      "Uma primeira análise da oportunidade, sem custo. Serve para entender se faz sentido seguir.",
  },
  {
    numero: "02",
    titulo: "Estudo aprofundado (pago)",
    texto:
      "Estudo a fundo da situação: o que existe, o volume, o que é possível e quais os caminhos.",
  },
  {
    numero: "03",
    titulo: "Montagem do projeto",
    texto:
      "Organização do projeto: a parte técnica, a jurídica, o modelo de negócio e os parceiros. A SBA monta tudo o que torna o projeto possível.",
  },
  {
    numero: "04",
    titulo: "Ligação até o contrato",
    texto:
      "A SBA liga cliente, operador, tecnologia e jurídico até o contrato. Quem faz a operação é o operador, não a SBA.",
  },
];

const Residuos = () => {
  const segmentos = solucoesPorTema("Resíduos & Aproveitamento");

  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Resíduos & Aproveitamento"
        titulo="Resíduo não é só custo. Bem aproveitado, vira receita."
        subtitulo="A SBA não constrói usinas: ela organiza o projeto e reúne cliente, operador, tecnologia e jurídico — do primeiro contato ao contrato. Atendemos o lixo urbano do município, as empresas que geram grande volume e o setor hospitalar."
        ctaPrincipal={{ label: "Conversar sobre um projeto", href: "/contato" }}
        imagem={{
          src: heroResiduos,
          alt: "Resíduo que vira energia e receita, em vez de ir para o aterro.",
        }}
      />

      {/* Do resíduo ao valor */}
      <section className="border-b border-border bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                Do resíduo ao valor
              </h2>
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>
                  Hoje o resíduo é, quase sempre, só despesa: transporte, aterro,
                  risco de multa ambiental e pressão da lei — o Novo Marco do
                  Saneamento (Lei 14.026/2020), que exige o fim dos lixões nos
                  municípios, e a Política Nacional de Resíduos, que responsabiliza
                  quem gera o lixo. A boa notícia é que, bem trabalhado, o mesmo
                  resíduo vira material reciclável, energia e receita nova.
                </p>
                <p>
                  É esse o caminho que a SBA monta — da coleta ao aproveitamento —
                  com a tecnologia certa para cada material e o operador certo
                  para tocar a usina.
                </p>
              </div>
            </div>
            <img
              src={residuoValor}
              alt="Do resíduo ao valor: reciclagem, energia e economia"
              className="w-full rounded-lg border border-border bg-white"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Os 3 segmentos */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Três tipos de resíduo, sem misturar
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cada tipo de resíduo tem regra, tecnologia e operador próprios. A
              SBA cuida de cada um separadamente.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {segmentos.map((s) => {
              const Icone = s.icon;
              const temPaginaPropria = s.href && s.href !== "/residuos";
              return (
                <div
                  key={s.id}
                  className="flex h-full flex-col rounded-lg border border-border bg-card p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icone className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-primary-dark">
                    {s.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.resumo}
                  </p>
                  <div className="mt-4 rounded-md bg-secondary/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      Benefício
                    </p>
                    <p className="mt-1 text-sm text-foreground/90">{s.beneficio}</p>
                  </div>
                  <div className="flex-1" />
                  <Link
                    to={temPaginaPropria ? s.href! : "/contato"}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    {temPaginaPropria ? "Ver detalhes" : "Falar sobre este resíduo"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hub Conector */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Como a SBA trabalha: organiza, não executa
            </h2>
            <p className="mt-4 text-muted-foreground">
              A SBA não toca a obra: ela organiza o projeto e reúne as pessoas
              certas. Trabalhamos por etapas, e cada uma só avança quando faz
              sentido para o cliente.
            </p>
          </div>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ESTAGIOS.map((estagio) => (
              <li
                key={estagio.numero}
                className="rounded-lg border border-border bg-card p-6"
              >
                <span className="font-display text-3xl font-bold text-gold">
                  {estagio.numero}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-primary-dark">
                  {estagio.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {estagio.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tecnologia do parceiro CSTR */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-5 inline-flex rounded-lg bg-primary-dark px-4 py-3">
                <img
                  src={cstrLogo}
                  alt="CSTR — Centro Sustentável de Tratamento de Resíduos"
                  className="h-12 w-auto"
                />
              </span>
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-foreground">
                Parceiro de tecnologia
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold text-primary-dark">
                A tecnologia vem da {PARCEIRO_CSTR.nome}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {PARCEIRO_CSTR.nomeCompleto}
              </p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {PARCEIRO_CSTR.chamada} Assim, o município ou a empresa não
                precisa escolher a tecnologia por conta própria: a SBA organiza o
                projeto e a {PARCEIRO_CSTR.nome} traz a tecnologia testada e a
                operação.
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

            <div className="space-y-5">
              <figure>
                <img
                  src={premioImg}
                  alt="CSTR reconhecido como Startup do ano (Troféu Frotas & Fretes Verdes 2025)"
                  className="w-full rounded-lg border border-border"
                  loading="lazy"
                />
                <figcaption className="mt-2 text-xs text-muted-foreground">
                  Reconhecido como Startup do ano — Troféu Frotas &amp; Fretes
                  Verdes 2025.
                </figcaption>
              </figure>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-7">
                <h3 className="font-display text-lg font-semibold text-primary-dark">
                  O que a {PARCEIRO_CSTR.nome} entrega
                </h3>
              <ul className="mt-5 space-y-3">
                {PARCEIRO_CSTR.entregas.map((item) => (
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
              <p className="mt-5 border-t border-primary/15 pt-4 text-sm text-muted-foreground">
                O objetivo é simples: tirar o resíduo do aterro e do risco
                ambiental e devolvê-lo como valor — energia, receita ou o
                cumprimento da lei. O tamanho e o custo de cada projeto dependem
                do caso — a SBA calcula isso junto com você.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planta de valorização — render */}
      <section className="bg-primary-dark">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <img
              src={plantaBiogas}
              alt="Ilustração de uma usina que transforma resíduo em energia (biogás, biometano e biofertilizante)"
              className="w-full rounded-lg shadow-xl ring-1 ring-white/10"
              loading="lazy"
            />
            <div className="text-primary-foreground">
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold">
                Como é uma usina que transforma o lixo
              </h2>
              <p className="mt-5 leading-relaxed text-primary-foreground/85">
                Em vez de mandar tudo para o aterro, o resíduo entra numa usina
                que separa, trata e transforma o material — gerando energia,
                biometano, biofertilizante e até crédito de carbono. É a
                estrutura que a SBA organiza junto ao parceiro de tecnologia.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Energia e biometano", "Biofertilizante", "Crédito de carbono", "Menos aterro"].map(
                  (b) => (
                    <li key={b} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-gold" />
                      <span className="text-primary-foreground/90">{b}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologias / capacidades da CSTR */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              As tecnologias da {PARCEIRO_CSTR.nome}
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cada material tem o seu sistema. Os números abaixo são a
              capacidade máxima que cada sistema do parceiro consegue tratar; o
              tamanho de cada projeto é definido caso a caso.
            </p>
          </div>

          {/* Projeto-âncora */}
          <div className="mt-10 rounded-lg border border-primary/20 bg-primary/5 p-6 md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-foreground">
                {PARCEIRO_CSTR.projeto.titulo}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-primary-dark">
                {PARCEIRO_CSTR.projeto.local}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {PARCEIRO_CSTR.projeto.tecnologia}
              </p>
            </div>
            <span className="mt-3 inline-block shrink-0 rounded-full bg-accent/15 px-3 py-1.5 text-sm font-semibold text-accent md:mt-0">
              {PARCEIRO_CSTR.projeto.status}
            </span>
          </div>

          {/* Sistemas */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARCEIRO_CSTR.sistemas.map((s) => {
              const Icone = s.icon;
              return (
                <div
                  key={s.nome}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary">
                      <Icone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {s.status && (
                      <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold-foreground">
                        {s.status}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-primary-dark">
                    {s.nome}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {s.capacidade}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.nota}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Capacidades técnicas informadas pelo parceiro {PARCEIRO_CSTR.nome}.
            O tamanho e o custo de cada projeto a SBA calcula com você.
          </p>
        </div>
      </section>

      <SecaoCTA
        titulo="Tem um desafio de resíduos na sua cidade ou empresa?"
        texto="Comece pela primeira leitura, sem custo. A partir dela, decidimos juntos se vale seguir para o estudo aprofundado."
        botao={{ label: "Conversar sobre um projeto", href: "/contato" }}
      />
    </Layout>
  );
};

export default Residuos;
