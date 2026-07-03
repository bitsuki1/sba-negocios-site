// ============================================================================
// Landing pages por produto (genéricas, orientadas a dados).
// As soluções com página própria rica (Tema 1130, Resíduos, RSS, Estabilizador)
// NÃO entram aqui — têm componente dedicado.
// Marca: "SBA Negócios". Honestidade: sem número inventado; "valores sob consulta".
// ============================================================================

import plantaBiogas from "@/assets/cstr/planta-biogas.jpg";
import incinerador from "@/assets/cstr/incinerador.jpg";
import floresta from "@/assets/cstr/floresta.jpg";
import solar from "@/assets/tiles/solar.png";
import iluminacao from "@/assets/tiles/iluminacao.png";
import saneamento from "@/assets/tiles/saneamento.png";
import cultura from "@/assets/tiles/cultura.png";

export interface Beneficio {
  titulo: string;
  texto: string;
}

export interface Landing {
  id: string;
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  imagem?: string;
  oQueE: { titulo: string; paragrafos: string[] };
  beneficios: Beneficio[];
  aplicacoes?: string[];
  parceiro?: { nota: string; href?: string };
  cta: { titulo: string; texto: string };
}

// Processo padrão da SBA (mesma esteira em todas as frentes não-tributárias)
export const PROCESSO_SBA = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    texto:
      "A SBA avalia a sua realidade e dimensiona a oportunidade. O primeiro passo é leve e sem compromisso.",
  },
  {
    numero: "02",
    titulo: "Estruturação",
    texto:
      "Montamos o arranjo técnico, jurídico e financeiro com os parceiros certos para o seu caso.",
  },
  {
    numero: "03",
    titulo: "Execução conectada",
    texto:
      "Ligamos quem executa e conduzimos até o resultado. A SBA não executa a obra — coordena.",
  },
];

export const LANDINGS: Record<string, Landing> = {
  "residuos-municipal": {
    id: "residuos-municipal",
    eyebrow: "Resíduos & Valorização · Município",
    titulo: "O lixo urbano deixa de ser problema e vira solução.",
    subtitulo:
      "Para prefeituras e consórcios, a SBA estrutura uma usina de tratamento e valorização do resíduo sólido urbano — do teaser ao contrato, com operador e tecnologia parceiros.",
    imagem: plantaBiogas,
    oQueE: {
      titulo: "Por que estruturar agora",
      paragrafos: [
        "O Novo Marco do Saneamento exige o fim dos lixões e a destinação adequada dos resíduos, ao mesmo tempo em que os aterros se esgotam e o custo de transporte só cresce. O resíduo urbano virou uma pressão de gestão e de orçamento.",
        "A SBA monta o projeto que transforma esse passivo em valor: uma planta que separa, trata e valoriza o resíduo, gerando energia, biometano e biofertilizante — com a tecnologia do parceiro e o operador certo para tocar a operação.",
      ],
    },
    beneficios: [
      { titulo: "Conformidade", texto: "Destinação adequada, alinhada ao Novo Marco do Saneamento." },
      { titulo: "Menos aterro", texto: "Reduz o volume enviado ao aterro e o custo de transporte." },
      { titulo: "Receita nova", texto: "Energia, biometano e biofertilizante a partir do que era custo." },
      { titulo: "Sem executar sozinho", texto: "A SBA traz a tecnologia validada e o operador; o município decide a cada etapa." },
    ],
    parceiro: {
      nota: "Tecnologia do parceiro CSTR. Veja a página de Resíduos para o detalhe técnico.",
      href: "/residuos",
    },
    cta: {
      titulo: "Quer entender o potencial da sua cidade?",
      texto: "Comece pelo teaser, sem custo. A partir dele, decidimos juntos se vale seguir.",
    },
  },

  "residuos-grandes-geradores": {
    id: "residuos-grandes-geradores",
    eyebrow: "Resíduos & Valorização · Empresas",
    titulo: "Resíduo industrial deixa de ser passivo.",
    subtitulo:
      "Para indústria, comércio e agro que geram grande volume, a SBA estrutura a destinação e a valorização dos resíduos — com conformidade legal, rastreabilidade e parceiros que operam.",
    imagem: incinerador,
    oQueE: {
      titulo: "O desafio de quem gera muito resíduo",
      paragrafos: [
        "Para o grande gerador, o resíduo significa custo logístico, risco ambiental e exigência regulatória crescente — sem que isso seja, em geral, o negócio principal da empresa.",
        "A SBA estrutura a solução de ponta a ponta: avalia o tipo e o volume, conecta a tecnologia e o operador adequados e organiza a destinação com rastreabilidade — para a empresa cuidar do seu negócio, não do lixo.",
      ],
    },
    beneficios: [
      { titulo: "Conformidade (PNRS)", texto: "Atende à Política Nacional de Resíduos Sólidos e à logística reversa." },
      { titulo: "Menos passivo", texto: "Reduz risco ambiental e a exposição da empresa." },
      { titulo: "Custo sob controle", texto: "Logística e destinação organizadas, com previsibilidade." },
      { titulo: "Valorização", texto: "Sempre que possível, o resíduo vira energia, matéria-prima ou receita." },
    ],
    parceiro: {
      nota: "Tecnologia do parceiro CSTR. Veja a página de Resíduos para o detalhe técnico.",
      href: "/residuos",
    },
    cta: {
      titulo: "Tem um volume de resíduo que hoje é só custo?",
      texto: "Fale com a SBA. Avaliamos o caso e estruturamos o melhor caminho — valores sob consulta.",
    },
  },

  "energia-fotovoltaica": {
    id: "energia-fotovoltaica",
    eyebrow: "Energia & Eficiência",
    titulo: "Energia solar para abastecer o que é público.",
    subtitulo:
      "A SBA estrutura usinas fotovoltaicas para abastecer prédios e equipamentos públicos, com engenharia e jurídico parceiros — para o município pagar menos pela energia que já consome.",
    imagem: solar,
    oQueE: {
      titulo: "Trocar conta de luz por ativo próprio",
      paragrafos: [
        "Boa parte do orçamento municipal vai para a conta de energia de escolas, postos de saúde, iluminação e prédios administrativos. A geração solar permite trocar parte dessa despesa por uma fonte própria e previsível.",
        "A SBA organiza o projeto — do estudo de viabilidade ao modelo de contratação — e conecta os parceiros de engenharia e jurídico que implantam e operam a usina.",
      ],
    },
    beneficios: [
      { titulo: "Economia direta", texto: "Redução previsível na conta de energia dos prédios públicos." },
      { titulo: "Previsibilidade", texto: "Menos exposição às variações de tarifa e bandeiras." },
      { titulo: "Sustentabilidade", texto: "Energia limpa, alinhada às metas ambientais do município." },
      { titulo: "Modelo sob medida", texto: "Da geração própria à contratação — a SBA estrutura o arranjo viável." },
    ],
    cta: {
      titulo: "Quanto a sua cidade gasta de energia hoje?",
      texto: "Fale com a SBA. Avaliamos o consumo e o potencial de economia — valores sob consulta.",
    },
  },

  "iluminacao-publica": {
    id: "iluminacao-publica",
    eyebrow: "Energia & Eficiência",
    titulo: "Iluminação pública mais eficiente e mais segura.",
    subtitulo:
      "A SBA estrutura a modernização da iluminação municipal — troca para LED e telegestão — do diagnóstico ao modelo de contratação, com os parceiros que executam.",
    imagem: iluminacao,
    oQueE: {
      titulo: "Iluminar melhor gastando menos",
      paragrafos: [
        "A iluminação pública é uma das maiores contas de energia do município e, muitas vezes, ainda usa tecnologia antiga, cara e de manutenção difícil. A modernização para LED com telegestão corta o consumo e melhora a qualidade da luz.",
        "A SBA organiza o projeto — diagnóstico do parque, modelo de contratação e financiamento — e conecta os parceiros que fazem a troca e a operação.",
      ],
    },
    beneficios: [
      { titulo: "Conta menor", texto: "O LED reduz o consumo de energia da iluminação pública." },
      { titulo: "Cidade mais segura", texto: "Luz melhor distribuída aumenta a sensação de segurança." },
      { titulo: "Telegestão", texto: "Controle e manutenção mais inteligentes, com menos apagões." },
      { titulo: "Modelo viável", texto: "A SBA estrutura a contratação que cabe no orçamento." },
    ],
    cta: {
      titulo: "Quer modernizar a iluminação da sua cidade?",
      texto: "Fale com a SBA. Avaliamos o parque atual e o potencial de economia — valores sob consulta.",
    },
  },

  "reflorestamento-carbono": {
    id: "reflorestamento-carbono",
    eyebrow: "Ambiental",
    titulo: "Recuperar áreas e abrir receita com carbono.",
    subtitulo:
      "A SBA estrutura projetos de restauração e reflorestamento de áreas, com a possibilidade de gerar crédito de carbono — unindo conformidade ambiental e nova fonte de receita.",
    imagem: floresta,
    oQueE: {
      titulo: "Da obrigação ambiental ao ativo",
      paragrafos: [
        "Áreas degradadas, reservas a recompor e passivos ambientais costumam ser vistos só como custo e obrigação legal. Bem estruturada, a restauração vira um ativo — inclusive financeiro, pela geração de crédito de carbono.",
        "A SBA organiza o projeto — diagnóstico da área, plano de restauração e estruturação do crédito — e conecta os parceiros técnicos que executam e certificam.",
      ],
    },
    beneficios: [
      { titulo: "Conformidade", texto: "Atende a obrigações ambientais e a compromissos de restauração." },
      { titulo: "Áreas recuperadas", texto: "Restauração de ecossistemas e conectividade ambiental." },
      { titulo: "Receita com carbono", texto: "Potencial de geração e venda de crédito de carbono." },
      { titulo: "Projeto certificável", texto: "A SBA conecta quem executa e quem certifica o crédito." },
    ],
    cta: {
      titulo: "Tem áreas a recuperar ou potencial de carbono?",
      texto: "Fale com a SBA. Avaliamos a área e o caminho — valores sob consulta.",
    },
  },

  "saneamento-agua": {
    id: "saneamento-agua",
    eyebrow: "Ambiental",
    titulo: "Água e esgoto tratados, dentro do Novo Marco.",
    subtitulo:
      "A SBA estrutura projetos de tratamento de água (ETA) e de esgoto (ETE), alinhados ao Novo Marco do Saneamento, com o arranjo técnico e financeiro montado.",
    imagem: saneamento,
    oQueE: {
      titulo: "Saneamento é meta e é saúde",
      paragrafos: [
        "O Novo Marco do Saneamento fixou metas de universalização de água e esgoto. Para muitos municípios, o desafio não é só técnico — é estruturar o projeto e o financiamento que tornam a obra viável.",
        "A SBA organiza esse caminho: avalia a situação, desenha a solução de ETA/ETE e conecta os parceiros de engenharia, operação e jurídico que executam.",
      ],
    },
    beneficios: [
      { titulo: "Conformidade", texto: "Alinhamento às metas do Novo Marco do Saneamento." },
      { titulo: "Saúde pública", texto: "Água tratada e esgoto adequado reduzem doenças e custos de saúde." },
      { titulo: "Projeto viável", texto: "Arranjo técnico e financeiro estruturado para sair do papel." },
      { titulo: "Parceiros certos", texto: "A SBA conecta quem projeta, executa e opera." },
    ],
    cta: {
      titulo: "Sua cidade precisa avançar em água e esgoto?",
      texto: "Fale com a SBA. Avaliamos a situação e os caminhos — valores sob consulta.",
    },
  },

  "eventos-cultura": {
    id: "eventos-cultura",
    eyebrow: "Cultura",
    titulo: "Projetos culturais que saem do papel.",
    subtitulo:
      "A SBA estrutura e ajuda a captar recursos para eventos e projetos culturais do município — com organização, parceiros e captação por leis de incentivo.",
    imagem: cultura,
    oQueE: {
      titulo: "Cultura também precisa de estrutura",
      paragrafos: [
        "Eventos e projetos culturais movimentam a economia local e a identidade da cidade — mas muitas vezes esbarram na falta de estruturação e de captação de recursos.",
        "A SBA organiza o projeto, conecta os parceiros e estrutura a captação (inclusive por leis de incentivo), para que a ideia vire um evento ou projeto viável.",
      ],
    },
    beneficios: [
      { titulo: "Economia local", texto: "Movimenta comércio, turismo e empregos na cidade." },
      { titulo: "Captação organizada", texto: "Estruturação de recursos, inclusive por leis de incentivo." },
      { titulo: "Projeto viável", texto: "Da ideia à execução, com os parceiros certos." },
      { titulo: "Identidade", texto: "Fortalece a cultura e a imagem do município." },
    ],
    cta: {
      titulo: "Tem um evento ou projeto cultural em mente?",
      texto: "Fale com a SBA. Estruturamos e ajudamos a viabilizar — valores sob consulta.",
    },
  },
};
