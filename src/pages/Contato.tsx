import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { FormularioContato } from "@/components/FormularioContato";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CONTATO } from "@/data/site";
import heroContato from "@/assets/fotos/sao-paulo.jpg";

const Contato = () => {
  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Contato"
        titulo="Dê o primeiro passo — a partir daqui, a SBA organiza tudo para você."
        subtitulo="Seja prefeito, secretário ou gestor de empresa: conte o seu caso e a SBA indica o melhor primeiro passo, sem compromisso."
        imagem={{ src: heroContato, alt: "São Paulo, onde fica a SBA Negócios." }}
      />

      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            {/* Dados de contato */}
            <div>
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-2xl font-bold text-primary-dark">
                Onde nos encontrar
              </h2>

              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-primary-dark">Endereço</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {CONTATO.endereco}
                      <br />
                      {CONTATO.bairro}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-primary-dark">Telefone / WhatsApp</p>
                    <a
                      href={`tel:${CONTATO.telefoneLink}`}
                      className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                    >
                      {CONTATO.telefone}
                    </a>
                    <a
                      href={`https://wa.me/${CONTATO.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
                    >
                      Chamar no WhatsApp →
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-primary-dark">E-mail</p>
                    <a
                      href={`mailto:${CONTATO.email}`}
                      className="mt-1 block break-all text-sm text-muted-foreground hover:text-primary"
                    >
                      {CONTATO.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-primary-dark">Atendimento</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Segunda a sexta, em horário comercial. Respondemos os
                      formulários em até 1 dia útil.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Formulário */}
            <div className="rounded-lg border border-border bg-secondary/30 p-7 md:p-8">
              <h2 className="font-display text-xl font-semibold text-primary-dark">
                Envie uma mensagem
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Se você é de uma prefeitura, informe a cidade — já começamos a
                levantar quanto ela tem a recuperar em impostos.
              </p>
              <div className="mt-6">
                <FormularioContato variante="contato" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
