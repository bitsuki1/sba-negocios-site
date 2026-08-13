import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV, MARCA } from "@/data/site";
import logoSba from "@/assets/logo-sba-horizontal.png";

const Logo = () => (
  <Link to="/" className="flex items-center" aria-label="SBA Negócios — início">
    <img
      src={logoSba}
      alt="SBA Negócios"
      className="h-9 w-auto md:h-10"
      width={202}
      height={100}
    />
  </Link>
);

export const Header = () => {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-sba flex h-16 items-center justify-between">
        <Logo />

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary-dark",
                  isActive && "text-primary"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <Link to="/contato">Falar com a SBA</Link>
          </Button>
        </div>

        {/* Botão mobile */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary-dark lg:hidden"
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
        >
          {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {aberto && (
        <nav
          className="border-t border-border bg-background lg:hidden"
          aria-label="Principal (mobile)"
        >
          <div className="container-sba flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setAberto(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-secondary",
                    isActive && "bg-secondary text-primary"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button asChild className="mt-2">
              <Link to="/contato" onClick={() => setAberto(false)}>
                Falar com a {MARCA.sigla}
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};
