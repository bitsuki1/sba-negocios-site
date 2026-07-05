import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Solucao } from "@/data/site";

interface CardSolucaoProps {
  solucao: Solucao;
  /** Mostra a etiqueta do tema (útil nos hubs por setor) */
  mostrarTema?: boolean;
}

const SETOR_LABEL: Record<string, string> = {
  publico: "Público",
  privado: "Privado",
};

export const CardSolucao = ({ solucao, mostrarTema = false }: CardSolucaoProps) => {
  const Icone = solucao.icon;
  const ehTributario = solucao.tema === "Recuperação Tributária";

  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md",
        solucao.destaque && "border-gold/60 ring-1 ring-gold/30"
      )}
    >
      <div className="relative">
        <img
          src={solucao.imagem}
          alt=""
          className="aspect-[3/2] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1.5">
          {solucao.setores.map((s) => (
            <span
              key={s}
              className="rounded-full bg-primary-dark/90 px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-sm backdrop-blur-sm"
            >
              {SETOR_LABEL[s]}
            </span>
          ))}
        </div>
      </div>
      <CardHeader>
        <span className="relative z-10 -mt-11 mb-1 flex h-12 w-12 items-center justify-center rounded-md bg-card text-primary shadow-md ring-1 ring-border">
          <Icone className="h-6 w-6" aria-hidden="true" />
        </span>
        {mostrarTema && (
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {solucao.tema}
          </p>
        )}
        <CardTitle className={cn("text-lg", mostrarTema ? "mt-1" : "mt-3")}>
          {solucao.titulo}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {solucao.resumo}
        </p>
        <div className="rounded-md bg-secondary/70 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Benefício
          </p>
          <p className="mt-1 text-sm text-foreground/90">{solucao.beneficio}</p>
        </div>

        <div className="flex-1" />

        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-muted-foreground">
            {ehTributario ? "Você só paga se recuperar." : "Preço conforme o caso."}
          </p>
          {solucao.href && (
            <Link
              to={solucao.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              Ver detalhes
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
