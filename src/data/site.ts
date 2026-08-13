// ============================================================================
// SBA Negócios — conteúdo central do site
// Edite aqui os dados que se repetem (contato, navegação, setores, soluções).
// Marca: sempre "SBA Negócios". Nunca use marcas antigas.
// ============================================================================

import {
  Landmark,
  Recycle,
  Factory,
  Syringe,
  SunMedium,
  Lightbulb,
  TreePine,
  Droplets,
  Layers,
  CalendarRange,
  Sofa,
  Disc3,
  Wheat,
  Flame,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

// Imagens por solução (tiles institucionais gerados + fotos reais dos parceiros)
import imgTributario from "@/assets/fotos/tributario.jpg";
import imgSolar from "@/assets/fotos/solar.jpg";
import imgIluminacao from "@/assets/fotos/iluminacao.jpg";
import imgSaneamento from "@/assets/fotos/saneamento.jpg";
import imgCultura from "@/assets/fotos/cultura.jpg";
import imgResiduosMun from "@/assets/cstr/planta-biogas.jpg";
import imgResiduosGer from "@/assets/cstr/incinerador.jpg";
import imgResiduosHosp from "@/assets/cstr/hospitalar.jpg";
import imgFloresta from "@/assets/cstr/floresta.jpg";
import imgEstrada from "@/assets/conaid/estrada.jpg";

export const MARCA = {
  nome: "SBA Negócios",
  sigla: "SBA",
  tagline: "Desenvolvimento de negócios e consultoria",
};

export const CONTATO = {
  endereco: "Rua XV de Novembro, 200 — 15º andar",
  bairro: "Sé, Centro Histórico — São Paulo/SP",
  telefone: "(11) 99157-4850",
  telefoneLink: "+5511991574850",
  whatsapp: "5511991574850",
  email: "eduardo@saobentoservicos.com.br",
  dominio: "sbanegocios.com.br",
};

export const NAV = [
  { label: "Início", href: "/" },
  { label: "Setor Público", href: "/setor-publico" },
  { label: "Setor Privado", href: "/setor-privado" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Sobre", href: "/sobre" },
  { label: "Seja um parceiro", href: "/seja-um-parceiro" },
  { label: "Contato", href: "/contato" },
];

// ----------------------------------------------------------------------------
// Setores — as duas "portas" do site
// ----------------------------------------------------------------------------
export type Setor = "publico" | "privado";

export interface SetorInfo {
  id: Setor;
  titulo: string;
  publico: string; // quem é
  resumo: string;
  href: string;
}

export const SETORES: SetorInfo[] = [
  {
    id: "publico",
    titulo: "Setor Público",
    publico: "Prefeituras e consórcios",
    resumo:
      "Recuperação de receita que já é do município (decisão definitiva do STF, o Tema 1130), lixo urbano, energia e obras — sempre com dados públicos, contas que você pode conferir e toda a parte técnica e jurídica organizada pela SBA.",
    href: "/setor-publico",
  },
  {
    id: "privado",
    titulo: "Setor Privado",
    publico: "Empresas, indústria e saúde",
    resumo:
      "Descarte e aproveitamento de resíduos — transformando o que hoje é custo em receita — para empresas de grande volume e para hospitais, dentro da lei, com registro de cada etapa e parceiros que fazem a operação.",
    href: "/setor-privado",
  },
];

// ----------------------------------------------------------------------------
// Temas — eixos de solução (usados na página Soluções)
// ----------------------------------------------------------------------------
export const TEMAS = [
  "Recuperação Tributária",
  "Resíduos & Aproveitamento",
  "Energia & Eficiência",
  "Ambiental",
  "Infraestrutura",
  "Cultura",
] as const;

export type Tema = (typeof TEMAS)[number];

// ----------------------------------------------------------------------------
// Soluções — fonte única do portfólio (alimenta hubs e página Soluções)
// Regra de honestidade: tributário = "no êxito"; demais = "valores sob consulta".
// ----------------------------------------------------------------------------
export interface Solucao {
  id: string;
  titulo: string;
  tema: Tema;
  setores: Setor[];
  resumo: string;
  beneficio: string;
  icon: LucideIcon;
  imagem: string; // imagem de abertura do card (tile institucional ou foto)
  href?: string; // página dedicada, quando existir
  destaque?: boolean;
}

export const SOLUCOES: Solucao[] = [
  {
    id: "tema-1130",
    imagem: imgTributario,
    titulo: "Recuperação Tributária — Tema 1130",
    tema: "Recuperação Tributária",
    setores: ["publico"],
    resumo:
      "O STF decidiu, em definitivo, que o IRRF retido nos pagamentos do município aos seus fornecedores é do próprio município. A SBA levanta, no dado público, quanto há a recuperar dos últimos 5 anos e quanto passa a entrar daqui pra frente.",
    beneficio:
      "Dinheiro recuperado e uma nova receita que passa a entrar todo ano — e você só paga sobre o que for de fato recuperado (nada é cobrado antes).",
    icon: Landmark,
    href: "/recuperacao-tributaria",
    destaque: true,
  },
  {
    id: "residuos-municipal",
    imagem: imgResiduosMun,
    titulo: "Resíduos Sólidos Urbanos (município)",
    tema: "Resíduos & Aproveitamento",
    setores: ["publico"],
    resumo:
      "Montagem de usinas que tratam o lixo urbano e o transformam em energia e receita, para prefeituras e consórcios — da apresentação inicial do projeto até a assinatura do contrato, com empresa operadora e tecnologia parceiras.",
    beneficio:
      "Descarte correto, menos aterro e potencial de energia e receita nova para o município.",
    icon: Recycle,
    href: "/residuos",
    destaque: true,
  },
  {
    id: "residuos-grandes-geradores",
    imagem: imgResiduosGer,
    titulo: "Resíduos de Grandes Geradores",
    tema: "Resíduos & Aproveitamento",
    setores: ["privado"],
    resumo:
      "Coleta, tratamento e aproveitamento de resíduos para indústrias, comércios e produtores rurais que geram grande volume.",
    beneficio:
      "Cumprimento da lei federal de resíduos (a PNRS), menos risco de multas e responsabilidades ambientais, e um custo de descarte previsível.",
    icon: Factory,
    href: "/residuos",
  },
  {
    id: "residuos-hospitalar",
    imagem: imgResiduosHosp,
    titulo: "Resíduos Hospitalares (RSS)",
    tema: "Resíduos & Aproveitamento",
    setores: ["privado"],
    resumo:
      "Tratamento de resíduos de serviços de saúde para hospitais, clínicas e laboratórios, com registro e comprovação de cada etapa, da coleta ao destino final.",
    beneficio:
      "Segurança sanitária e cumprimento das normas de saúde (regras da ANVISA), com registro e comprovação de cada etapa, da coleta ao destino final.",
    icon: Syringe,
    href: "/residuos-hospitalares",
  },
  {
    id: "energia-fotovoltaica",
    imagem: imgSolar,
    titulo: "Energia Fotovoltaica",
    tema: "Energia & Eficiência",
    setores: ["publico"],
    resumo:
      "Usinas solares para abastecer prédios públicos, montadas com parceiros de engenharia e assessoria jurídica.",
    beneficio: "Economia direta e previsível na conta de energia do município.",
    icon: SunMedium,
    href: "/solucoes/energia-fotovoltaica",
  },
  {
    id: "iluminacao-publica",
    imagem: imgIluminacao,
    titulo: "Iluminação Pública",
    tema: "Energia & Eficiência",
    setores: ["publico"],
    resumo:
      "Modernização da iluminação da cidade (troca por LED e controle remoto das lâmpadas), do levantamento à definição de como contratar.",
    beneficio: "Conta de energia menor e uma cidade mais bem iluminada e segura.",
    icon: Lightbulb,
    href: "/solucoes/iluminacao-publica",
  },
  {
    id: "reflorestamento-carbono",
    imagem: imgFloresta,
    titulo: "Reflorestamento & Crédito de Carbono",
    tema: "Ambiental",
    setores: ["publico"],
    resumo:
      "Restauração e reflorestamento de áreas degradadas, com possibilidade de gerar renda pela venda de crédito de carbono.",
    beneficio:
      "Cumprimento da lei ambiental, áreas recuperadas e potencial de receita com a venda de crédito de carbono.",
    icon: TreePine,
    href: "/solucoes/reflorestamento-carbono",
  },
  {
    id: "saneamento-agua",
    imagem: imgSaneamento,
    titulo: "Saneamento & Água (ETA/ETE)",
    tema: "Ambiental",
    setores: ["publico"],
    resumo:
      "Projetos de tratamento de água e esgoto, de acordo com a nova lei federal do saneamento (que fixou metas de água e esgoto para todos até 2033).",
    beneficio:
      "Cumprimento da lei e mais saúde pública, com toda a parte técnica e o financiamento já organizados.",
    icon: Droplets,
    href: "/solucoes/saneamento-agua",
  },
  {
    id: "estabilizador-solo",
    imagem: imgEstrada,
    titulo: "Estabilizador de Solo (ConAid CBR Plus)",
    tema: "Infraestrutura",
    setores: ["publico"],
    resumo:
      "Tratamento que endurece o próprio solo com o ConAid CBR Plus (referência mundial, usado em mais de 100 países) para estradas, pátios e obras — menos lama, menos poeira e menos manutenção.",
    beneficio:
      "Estradas firmes o ano todo, com custo de material muito menor que cascalho, brita ou solo-cimento.",
    icon: Layers,
    href: "/estabilizador-de-solo",
  },
  {
    id: "eventos-cultura",
    imagem: imgCultura,
    titulo: "Eventos & Projetos Culturais",
    tema: "Cultura",
    setores: ["publico"],
    resumo:
      "Organização e busca de patrocínio e recursos para eventos e projetos culturais da cidade.",
    beneficio: "Economia local movimentada e projetos que saem do papel, com a busca de recursos já organizada.",
    icon: CalendarRange,
    href: "/solucoes/eventos-cultura",
  },
];

// Helpers
export const solucoesPorSetor = (setor: Setor) =>
  SOLUCOES.filter((s) => s.setores.includes(setor));

export const solucoesPorTema = (tema: Tema) =>
  SOLUCOES.filter((s) => s.tema === tema);

// ----------------------------------------------------------------------------
// Parceiro de tecnologia — CSTR (conteúdo cedido pelo parceiro)
// ----------------------------------------------------------------------------
export interface SistemaCSTR {
  nome: string;
  capacidade: string;
  nota: string;
  icon: LucideIcon;
  status?: string; // ex.: "Em desenvolvimento (PD&I)"
}

export const PARCEIRO_CSTR = {
  nome: "CSTR",
  nomeCompleto: "Centro Sustentável de Tratamento de Resíduos",
  origem: "Ouro Preto — MG",
  site: "https://cstr.eco.br",
  chamada:
    "Para transformar o lixo em receita, a SBA trabalha com a CSTR. Ela projeta, constrói e opera usinas de tratamento de resíduos — transformando o que antes era só custo e risco ambiental em fonte de renda.",
  entregas: [
    "Energia elétrica, biogás, biometano e biofertilizante",
    "Plantas de resíduos projetadas, implantadas e gerenciadas",
    "Reconhecida como Startup do ano (Troféu Frotas & Fretes Verdes 2025)",
    "Tecnologia própria, com equipe dedicada a pesquisa e desenvolvimento (P&D)",
  ],
  // Projeto-âncora (fato divulgado pelo parceiro)
  projeto: {
    titulo: "Planta em escala industrial",
    local: "Congonhas do Campo — MG",
    status: "Em construção — inauguração prevista para 2027",
    tecnologia: "Tecnologia de explosão a vapor",
  },
  // Linha de tecnologias / capacidades técnicas (do parceiro CSTR)
  sistemas: [
    {
      nome: "Resíduos sólidos urbanos",
      capacidade: "50 a 300 t/dia",
      nota: "Separação automatizada; o tamanho se adapta à cidade.",
      icon: Recycle,
    },
    {
      nome: "Resíduos volumosos",
      capacidade: "10 a 100 t/dia",
      nota: "Móveis, colchões, sofás e itens grandes; recupera metais recicláveis.",
      icon: Sofa,
    },
    {
      nome: "Pneus usados",
      capacidade: "2 a 10 t/dia",
      nota: "Vira granulado de borracha, aço e fibra — matéria-prima nova.",
      icon: Disc3,
    },
    {
      nome: "Biomassa",
      capacidade: "10 a 80 t/dia",
      nota: "Resíduo agrícola e florestal vira energia, pellets e briquetes.",
      icon: Wheat,
    },
    {
      nome: "Resíduos hospitalares (RSS)",
      capacidade: "180 a 200 kg/dia",
      nota: "Incineração em alta temperatura (até 1200 °C), no próprio local de geração.",
      icon: Flame,
    },
    {
      nome: "NEOMAG",
      capacidade: "até 2 t/dia",
      nota: "Tratamento térmico que reduz até 90% do volume e elimina os agentes causadores de doença (patógenos), sem combustível fóssil.",
      icon: FlaskConical,
      status: "Em desenvolvimento (pesquisa e testes)",
    },
  ] as SistemaCSTR[],
};

// ----------------------------------------------------------------------------
// Desafios por setor — abertura dos hubs (inspirado no material do parceiro)
// ----------------------------------------------------------------------------
export const DESAFIOS: Record<Setor, { titulo: string; itens: string[] }> = {
  publico: {
    titulo: "Os desafios do município",
    itens: [
      "Dinheiro que já é da prefeitura (o imposto de renda descontado dos pagamentos a fornecedores) e que ela deixa de recuperar",
      "Aterros lotados e lixo urbano sem destino adequado",
      "Custos operacionais e conta de energia que pressionam o orçamento",
      "Projetos sustentáveis parados por falta de quem organize a parte técnica e a jurídica",
    ],
  },
  privado: {
    titulo: "Os desafios das empresas",
    itens: [
      "Custos de transporte e descarte que crescem com o volume e pesam no resultado",
      "Devolução de embalagens usadas, licenças e comprovação de cada etapa para descartar dentro da lei",
      "Problemas ambientais que viram multa e paralisação — e a lei responsabiliza também quem gerou o resíduo, mesmo quando o erro foi da transportadora",
      "Exigências da lei de resíduos (a PNRS), dos órgãos ambientais e, na saúde, das normas da ANVISA",
    ],
  },
};

// Passos didáticos da Recuperação Tributária
export const PASSOS_TRIBUTARIO = [
  {
    numero: "01",
    titulo: "Levantamento",
    texto:
      "A partir de dados públicos das contas do município, a SBA estima quanto há de imposto de renda retido (o IRRF) a recuperar dos últimos 5 anos e quanto passa a entrar daqui pra frente.",
  },
  {
    numero: "02",
    titulo: "Estudo da sua cidade",
    texto:
      "Você recebe um estudo com uma estimativa do valor mínimo a recuperar (um piso, não uma promessa) e o método usado — com base em dados públicos e passível de auditoria, sem nenhum custo adiantado.",
  },
  {
    numero: "03",
    titulo: "Confirmação e recuperação",
    texto:
      "Na fase seguinte, o valor é confirmado documento a documento, com o acompanhamento da SBA. Os honorários são cobrados apenas sobre o que de fato for recuperado.",
  },
];

// ----------------------------------------------------------------------------
// Time — preencha para exibir a seção "Quem conduz" no Sobre.
// Enquanto a lista estiver VAZIA, a seção nem aparece (gated). Para publicar:
// 1) coloque as fotos em src/assets/time/ e importe-as no topo deste arquivo;
// 2) adicione um objeto por pessoa abaixo (nome, cargo, bio e a foto importada).
// ----------------------------------------------------------------------------
export interface MembroTime {
  nome: string;
  cargo: string;
  bio: string;
  foto?: string; // import de src/assets/time/...
  linkedin?: string;
}

export const TIME: MembroTime[] = [
  // Exemplo (descomente e preencha):
  // {
  //   nome: "Eduardo Sobrenome",
  //   cargo: "Fundador",
  //   bio: "Trajetória curta e foco de atuação.",
  //   foto: fotoEduardo,
  //   linkedin: "https://www.linkedin.com/in/...",
  // },
];
