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
      "Recuperação de receita (Tema 1130), resíduos urbanos, energia e infraestrutura — sempre com dado público, método auditável e o arranjo técnico-jurídico montado pela SBA.",
    href: "/setor-publico",
  },
  {
    id: "privado",
    titulo: "Setor Privado",
    publico: "Empresas, indústria e saúde",
    resumo:
      "Destinação e valorização de resíduos para grandes geradores e para o setor hospitalar, com conformidade legal, rastreabilidade e parceiros que executam.",
    href: "/setor-privado",
  },
];

// ----------------------------------------------------------------------------
// Temas — eixos de solução (usados na página Soluções)
// ----------------------------------------------------------------------------
export const TEMAS = [
  "Recuperação Tributária",
  "Resíduos & Valorização",
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
      "Receita recuperada e nova arrecadação recorrente — com honorários 100% no êxito.",
    icon: Landmark,
    href: "/recuperacao-tributaria",
    destaque: true,
  },
  {
    id: "residuos-municipal",
    imagem: imgResiduosMun,
    titulo: "Resíduos Sólidos Urbanos (município)",
    tema: "Resíduos & Valorização",
    setores: ["publico"],
    resumo:
      "Estruturação de usina de tratamento e valorização do lixo urbano para prefeituras e consórcios — do teaser ao contrato, com operador e tecnologia parceiros.",
    beneficio:
      "Destinação adequada, menos aterro e potencial de energia e receita nova para o município.",
    icon: Recycle,
    href: "/residuos",
    destaque: true,
  },
  {
    id: "residuos-grandes-geradores",
    imagem: imgResiduosGer,
    titulo: "Resíduos de Grandes Geradores",
    tema: "Resíduos & Valorização",
    setores: ["privado"],
    resumo:
      "Solução de destinação e valorização para indústria, comércio e agro que geram grande volume de resíduos.",
    beneficio:
      "Conformidade com a Política Nacional de Resíduos, menos passivo ambiental e custo de destinação previsível.",
    icon: Factory,
    href: "/residuos",
  },
  {
    id: "residuos-hospitalar",
    imagem: imgResiduosHosp,
    titulo: "Resíduos Hospitalares (RSS)",
    tema: "Resíduos & Valorização",
    setores: ["privado"],
    resumo:
      "Tratamento de resíduos de serviços de saúde para hospitais, clínicas e laboratórios, com rastreabilidade do recolhimento à destinação final.",
    beneficio:
      "Segurança sanitária e conformidade (ANVISA), com rastreabilidade do recolhimento à destinação final.",
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
      "Usinas solares para abastecer prédios públicos, estruturadas com parceiros de engenharia e jurídico.",
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
      "Modernização da iluminação municipal (LED e telegestão), do diagnóstico ao modelo de contratação.",
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
      "Restauração e reflorestamento de áreas, com possibilidade de gerar crédito de carbono.",
    beneficio:
      "Conformidade ambiental, áreas recuperadas e potencial de receita com carbono.",
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
      "Estruturação de projetos de tratamento de água e esgoto, alinhados ao Novo Marco do Saneamento.",
    beneficio:
      "Conformidade legal e saúde pública, com o arranjo técnico e financeiro montado.",
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
      "Estabilização iônica do solo com o ConAid CBR Plus (referência mundial, usado em mais de 100 países) para estradas, pátios e obras — menos lama, menos poeira e menos manutenção.",
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
      "Estruturação e captação de recursos para eventos e projetos culturais do município.",
    beneficio: "Economia local movimentada e projetos viáveis, com captação organizada.",
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
    "Para transformar resíduo em valor, a SBA trabalha com a CSTR. Ela projeta, implanta e gerencia plantas de tratamento de resíduos — transformando passivos ambientais em ativos econômicos.",
  entregas: [
    "Energia elétrica, biogás, biometano e biofertilizante",
    "Plantas de resíduos projetadas, implantadas e gerenciadas",
    "Reconhecida como Startup do ano (Troféu Frotas & Fretes Verdes 2025)",
    "Tecnologia própria, com frente de pesquisa e inovação (PD&I)",
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
      nota: "Separação automatizada, sistema modular e escalável.",
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
      nome: "NEOMAG — neotermólise óxido-magnética",
      capacidade: "até 2 t/dia",
      nota: "Reduz até 90% da massa e elimina patógenos, sem combustível fóssil.",
      icon: FlaskConical,
      status: "Em desenvolvimento (PD&I)",
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
      "Receita do próprio município (o IRRF retido dos fornecedores) que deixa de ser recuperada",
      "Aterros saturados e resíduos urbanos sem destino adequado",
      "Custos operacionais e conta de energia que pressionam o orçamento",
      "Projetos sustentáveis parados por falta de estruturação técnica e jurídica",
    ],
  },
  privado: {
    titulo: "Os desafios das empresas",
    itens: [
      "Custos de transporte e destinação que crescem com o volume e pesam no resultado",
      "Logística reversa, licenças e rastreabilidade para destinar dentro da lei",
      "Passivos ambientais que viram autuação e embargo — mesmo quando o erro é do transportador",
      "Exigências da PNRS, dos órgãos ambientais e, na saúde, da ANVISA",
    ],
  },
};

// Passos didáticos da Recuperação Tributária
export const PASSOS_TRIBUTARIO = [
  {
    numero: "01",
    titulo: "Levantamento",
    texto:
      "A partir de dados públicos das contas do município, a SBA estima quanto há de IRRF a recuperar dos últimos 5 anos e quanto passa a entrar daqui pra frente.",
  },
  {
    numero: "02",
    titulo: "Estudo da sua cidade",
    texto:
      "Você recebe um estudo com o valor de piso estimado e o método utilizado — dado público e auditável, sem nenhum custo antecipado.",
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
