import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { NAV, CONTATO, MARCA } from "@/data/site";
import logoSba from "@/assets/sba-logo-flat.png";

export const Footer = () => {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary-dark text-primary-foreground">
      <div className="container-sba grid gap-10 py-14 md:grid-cols-3">
        {/* Marca */}
        <div>
          <span className="inline-flex rounded-lg bg-primary-foreground px-3 py-2">
            <img src={logoSba} alt="SBA Negócios" className="h-9 w-auto" loading="lazy" />
          </span>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/75">
            {MARCA.tagline} para os setores público e privado. A gestão que reúne
            todos os envolvidos e monta o projeto por você.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2.5">
            {[...NAV, { label: "Seja um parceiro", href: "/seja-um-parceiro" }].map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-sm text-primary-foreground/85 transition-colors hover:text-primary-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
            Contato
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {CONTATO.endereco}
                <br />
                {CONTATO.bairro}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${CONTATO.telefoneLink}`} className="hover:text-primary-foreground">
                {CONTATO.telefone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 shrink-0 text-gold" />
              <a
                href={`https://wa.me/${CONTATO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground"
              >
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${CONTATO.email}`} className="break-all hover:text-primary-foreground">
                {CONTATO.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-sba flex flex-col items-center justify-between gap-2 py-5 text-xs text-primary-foreground/65 sm:flex-row">
          <p>© {ano} SBA Negócios. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacidade"
              className="transition-colors hover:text-primary-foreground"
            >
              Política de Privacidade
            </Link>
            <span>{CONTATO.dominio}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
