import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Caminho base: "/" — a producao roda na VERCEL no apex sbanegocios.com.br.
  // BASE_PATH so existiria para o GitHub Pages de projeto (subcaminho), que e
  // LEGADO: o deploy-pages.yml nem define BASE_PATH (builda em "/") e teve o
  // gatilho de push removido em 2026-08-13. Comentario corrigido em 25/08 —
  // citava "/sba-site/", nome que nao existe mais (repo = sba-negocios-site).
  base: process.env.BASE_PATH || "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
