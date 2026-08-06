import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
// Web Analytics da Vercel — mede visitas/rotas sem cookies e sem PII, e
// não roda em desenvolvimento (o componente já se auto-desliga fora de prod).
// Só coleta quando o site está publicado na Vercel; no GitHub Pages é inócuo.
import { Analytics } from "@vercel/analytics/react";

// Lazy-load das páginas: cada rota vira um chunk próprio, carregado sob demanda.
// Isso reduz o bundle inicial e acelera o primeiro carregamento.
const Home = lazy(() => import("@/pages/Home"));
const SetorPublico = lazy(() => import("@/pages/SetorPublico"));
const SetorPrivado = lazy(() => import("@/pages/SetorPrivado"));
const Solucoes = lazy(() => import("@/pages/Solucoes"));
const RecuperacaoTributaria = lazy(() => import("@/pages/RecuperacaoTributaria"));
const Residuos = lazy(() => import("@/pages/Residuos"));
const ResiduosHospitalares = lazy(() => import("@/pages/ResiduosHospitalares"));
const EstabilizadorSolo = lazy(() => import("@/pages/EstabilizadorSolo"));
const PaginaSolucao = lazy(() => import("@/pages/PaginaSolucao"));
const Sobre = lazy(() => import("@/pages/Sobre"));
const SejaParceiro = lazy(() => import("@/pages/SejaParceiro"));
const Contato = lazy(() => import("@/pages/Contato"));
const PoliticaPrivacidade = lazy(() => import("@/pages/PoliticaPrivacidade"));
// Guia do processo (Tema 1130) — página SEM link interno (acesso só pela URL,
// enviada a parceiros/clientes) e com noindex; ver seo-routes.json.
const GuiaEtapas = lazy(() => import("@/pages/GuiaEtapas"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const Fallback = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-background"
    aria-label="Carregando"
  >
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setor-publico" element={<SetorPublico />} />
          <Route path="/setor-privado" element={<SetorPrivado />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/recuperacao-tributaria" element={<RecuperacaoTributaria />} />
          <Route path="/residuos" element={<Residuos />} />
          <Route path="/residuos-hospitalares" element={<ResiduosHospitalares />} />
          <Route path="/estabilizador-de-solo" element={<EstabilizadorSolo />} />
          <Route path="/solucoes/:slug" element={<PaginaSolucao />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/seja-um-parceiro" element={<SejaParceiro />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/privacidade" element={<PoliticaPrivacidade />} />
          {/* rota "não listada": nenhum menu/rodapé aponta para cá (de propósito) */}
          <Route path="/guia-etapas" element={<GuiaEtapas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;
