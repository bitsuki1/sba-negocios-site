-- aplicada: nenhuma — desenho tirado do banco gestao-integrada-dados (lbjudeifksyeqminwlto) em 2026-11-23T20:32Z pelo robô desenho-de-banco.yml (rodada 45259964772),
-- só lendo (pg_dump --schema-only pelo copia_leitura, sem dado, sem dono, sem permissões): registro do que existia sem migração, não migração.
-- alvo: public.sba_leads
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.12 (Debian 17.12-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = on;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sba_leads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sba_leads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    tipo text DEFAULT 'contato'::text NOT NULL,
    nome text NOT NULL,
    email text NOT NULL,
    telefone text,
    organizacao text,
    perfil text,
    mensagem text NOT NULL,
    origem text DEFAULT 'site-sba-negocios'::text,
    ip text,
    CONSTRAINT sba_leads_email_check CHECK ((char_length(email) <= 200)),
    CONSTRAINT sba_leads_mensagem_check CHECK ((char_length(mensagem) <= 5000)),
    CONSTRAINT sba_leads_nome_check CHECK ((char_length(nome) <= 200)),
    CONSTRAINT sba_leads_organizacao_check CHECK ((char_length(organizacao) <= 200)),
    CONSTRAINT sba_leads_perfil_check CHECK ((char_length(perfil) <= 300)),
    CONSTRAINT sba_leads_telefone_check CHECK ((char_length(telefone) <= 60)),
    CONSTRAINT sba_leads_tipo_check CHECK ((tipo = ANY (ARRAY['contato'::text, 'parceiro'::text])))
);


--
-- Name: TABLE sba_leads; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.sba_leads IS 'Leads recebidos pelos formulários do site SBA Negócios (contato e parceiro).';


--
-- Name: sba_leads sba_leads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sba_leads
    ADD CONSTRAINT sba_leads_pkey PRIMARY KEY (id);


--
-- Name: sba_leads_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sba_leads_created_at_idx ON public.sba_leads USING btree (created_at DESC);


--
-- Name: sba_leads_ip_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sba_leads_ip_created_at_idx ON public.sba_leads USING btree (ip, created_at DESC);


--
-- Name: sba_leads copia_leitura_so_le; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY copia_leitura_so_le ON public.sba_leads FOR SELECT TO copia_leitura USING (true);


--
-- Name: sba_leads leads_insert_anon; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY leads_insert_anon ON public.sba_leads FOR INSERT TO authenticated, anon WITH CHECK (((tipo = ANY (ARRAY['contato'::text, 'parceiro'::text])) AND (origem = 'site-sba-negocios'::text)));


--
-- Name: sba_leads; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.sba_leads ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


