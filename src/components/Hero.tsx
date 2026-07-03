import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroProps {
  eyebrow?: string;
  titulo: string;
  subtitulo: string;
  ctaPrincipal?: { label: string; href: string };
  ctaSecundario?: { label: string; href: string };
  /** Imagem de destaque à direita (ex.: home) */
  imagem?: { src: string; alt: string };
  /** Versão compacta para páginas internas */
  compacto?: boolean;
}

export const Hero = ({
  eyebrow,
  titulo,
  subtitulo,
  ctaPrincipal,
  ctaSecundario,
  imagem,
  compacto = false,
}: HeroProps) => {
  return (
    <section
      className="relative overflow-hidden bg-primary-dark text-primary-foreground"
      aria-label="Destaque"
    >
      {/* Textura institucional discreta */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/40 blur-3xl"
        aria-hidden="true"
      />

      <div
        className={`container-sba relative ${
          compacto ? "py-16 md:py-20" : "py-20 md:py-28"
        }`}
      >
        <div
          className={
            imagem
              ? "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
              : ""
          }
        >
          <div className={`animate-fade-up ${imagem ? "" : "max-w-3xl"}`}>
            {eyebrow && (
              <>
                <div className="rule-gold mb-5" />
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                  {eyebrow}
                </p>
              </>
            )}
            <h1
              className={`font-display font-bold leading-[1.08] ${
                compacto
                  ? "text-3xl md:text-4xl"
                  : "text-4xl md:text-5xl lg:text-[3.4rem]"
              }`}
            >
              {titulo}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
              {subtitulo}
            </p>

            {(ctaPrincipal || ctaSecundario) && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {ctaPrincipal && (
                  <Button asChild variant="gold" size="lg">
                    <Link to={ctaPrincipal.href}>{ctaPrincipal.label}</Link>
                  </Button>
                )}
                {ctaSecundario && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary-dark"
                  >
                    <Link to={ctaSecundario.href}>{ctaSecundario.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          {imagem && (
            <div className="animate-fade-up">
              <img
                src={imagem.src}
                alt={imagem.alt}
                className="w-full rounded-xl shadow-2xl ring-1 ring-white/10"
                loading="eager"
                width={1400}
                height={1050}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
