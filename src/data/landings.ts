// ============================================================================
// Landing pages por produto (genéricas, orientadas a dados).
// As soluções com página própria rica (Tema 1130, Resíduos, RSS, Estabilizador)
// NÃO entram aqui — têm componente dedicado.
// Marca: "SBA Negócios". Honestidade: sem número inventado; "valores sob consulta".
// ============================================================================

import floresta from "@/assets/cstr/floresta.jpg";
import solar from "@/assets/fotos/solar.jpg";
import iluminacao from "@/assets/fotos/iluminacao.jpg";
import saneamento from "@/assets/fotos/saneamento.jpg";
import cultura from "@/assets/fotos/cultura.jpg";

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
  faq?: { q: string; a: string }[];
  parceiro?: { nota: string; href?: string };
  cta: { titulo: string; texto: string };
}

// Processo padrão da SBA (mesma esteira em todas as frentes não-tributárias)
export const PROCESSO_SBA = [
  {
    numero: "01",
    titulo: "Análise",
    texto:
      "A SBA analisa a sua situação e calcula quanto você pode ganhar ou economizar. O primeiro contato é simples e sem compromisso.",
  },
  {
    numero: "02",
    titulo: "Montagem do projeto",
    texto:
      "Organizamos toda a parte técnica, a jurídica e o financiamento, com os parceiros certos para o seu caso.",
  },
  {
    numero: "03",
    titulo: "Execução com quem faz",
    texto:
      "Trazemos as empresas que executam e acompanhamos até o resultado final. A SBA não faz a obra — ela organiza e coordena.",
  },
];

export const LANDINGS: Record<string, Landing> = {
  "energia-fotovoltaica": {
    id: "energia-fotovoltaica",
    eyebrow: "Energia & Eficiência",
    titulo: "Energia solar para abastecer o que é público.",
    subtitulo:
      "A SBA monta usinas de energia solar para abastecer prédios e equipamentos públicos, com parceiros de engenharia e jurídico — para o município pagar menos pela energia que já consome.",
    imagem: solar,
    oQueE: {
      titulo: "Trocar a conta de luz por uma usina da própria prefeitura",
      paragrafos: [
        "Boa parte do orçamento municipal vai para a conta de energia de escolas, postos de saúde, iluminação e prédios administrativos. A energia solar permite trocar parte dessa despesa por uma fonte própria e de custo previsível.",
        "A SBA organiza o projeto — do estudo de viabilidade à definição de como contratar — e reúne os parceiros de engenharia e jurídico que instalam e operam a usina.",
      ],
    },
    beneficios: [
      { titulo: "Economia direta", texto: "Redução previsível na conta de energia dos prédios públicos." },
      { titulo: "Previsibilidade", texto: "Menos impacto quando a tarifa de energia sobe ou entram as bandeiras vermelhas." },
      { titulo: "Sustentabilidade", texto: "Energia limpa, alinhada às metas ambientais do município." },
      { titulo: "Modelo sob medida", texto: "Da usina própria à compra de energia — a SBA monta o modelo que cabe no orçamento." },
    ],
    aplicacoes: [
      "Escolas, creches e unidades de saúde",
      "Prédios administrativos e a Câmara",
      "Iluminação e bombeamento públicos",
      "Estações de tratamento de água e esgoto",
      "Equipamentos de esporte e cultura",
    ],
    faq: [
      {
        q: "A economia é garantida?",
        a: "Não trabalhamos com promessa. Fazemos um estudo de viabilidade com o consumo real do município e mostramos o potencial de economia antes de qualquer decisão.",
      },
      {
        q: "O município precisa investir?",
        a: "Depende do modelo — da usina própria à compra de energia. A SBA monta o modelo que cabe no orçamento; o custo depende de cada caso e a SBA informa depois de avaliar o projeto.",
      },
      {
        q: "Quem executa e opera a usina?",
        a: "Empresas parceiras de engenharia e de assessoria jurídica. A SBA identifica a oportunidade e coordena o projeto — não faz a obra diretamente.",
      },
    ],
    cta: {
      titulo: "Quanto a sua cidade gasta de energia hoje?",
      texto: "Fale com a SBA. Avaliamos o seu consumo e quanto dá para economizar; o custo depende do caso e informamos depois da análise.",
    },
  },

  "iluminacao-publica": {
    id: "iluminacao-publica",
    eyebrow: "Energia & Eficiência",
    titulo: "Iluminação pública mais eficiente e mais segura.",
    subtitulo:
      "A SBA organiza a modernização da iluminação da cidade — troca por LED e controle remoto das lâmpadas — do levantamento à definição de como contratar, com os parceiros que executam.",
    imagem: iluminacao,
    oQueE: {
      titulo: "Iluminar melhor gastando menos",
      paragrafos: [
        "A iluminação pública é uma das maiores contas de energia do município e, muitas vezes, ainda usa tecnologia antiga, cara e de manutenção difícil. A troca por LED, com controle remoto das lâmpadas, corta o consumo e melhora a qualidade da luz.",
        "A SBA organiza o projeto — levantamento de todos os pontos de luz da cidade, definição de como contratar e do financiamento — e reúne os parceiros que fazem a troca e a operação.",
      ],
    },
    beneficios: [
      { titulo: "Conta menor", texto: "O LED reduz o consumo de energia da iluminação pública." },
      { titulo: "Cidade mais segura", texto: "Luz melhor distribuída aumenta a sensação de segurança." },
      { titulo: "Controle remoto", texto: "Controle e manutenção mais inteligentes, com menos apagões." },
      { titulo: "Modelo viável", texto: "A SBA organiza a contratação que cabe no orçamento." },
    ],
    aplicacoes: [
      "Vias, avenidas e rodovias urbanas",
      "Praças, parques e áreas de lazer",
      "Entornos de escolas e unidades de saúde",
      "Travessias e pontos de insegurança",
      "Prédios e monumentos públicos",
    ],
    faq: [
      {
        q: "O LED reduz mesmo a conta?",
        a: "O LED consome bem menos que a tecnologia antiga. Levantamos todos os pontos de luz atuais e projetamos a economia caso a caso, sem prometer um número fixo.",
      },
      {
        q: "O que é esse controle remoto das lâmpadas?",
        a: "É um sistema (chamado telegestão) que acende, apaga e detecta falhas à distância, reduzindo apagões e custo de manutenção.",
      },
      {
        q: "Como é contratado?",
        a: "A SBA organiza o modelo — do levantamento ao financiamento — que cabe no orçamento e pode ser pago pela COSIP/CIP, a taxa de iluminação pública que já vem na conta de luz dos moradores; o custo depende de cada caso e a SBA informa depois de avaliar.",
      },
    ],
    cta: {
      titulo: "Quer modernizar a iluminação da sua cidade?",
      texto: "Fale com a SBA. Avaliamos os pontos de luz atuais e quanto dá para economizar; o custo depende do caso e informamos depois da análise.",
    },
  },

  "reflorestamento-carbono": {
    id: "reflorestamento-carbono",
    eyebrow: "Ambiental",
    titulo: "Recuperar áreas e gerar renda com crédito de carbono.",
    subtitulo:
      "A SBA organiza projetos de restauração e reflorestamento de áreas, com a possibilidade de gerar crédito de carbono (um certificado que pode ser vendido a empresas que precisam compensar suas emissões) — unindo o cumprimento da lei ambiental e uma nova fonte de renda.",
    imagem: floresta,
    oQueE: {
      titulo: "Da obrigação ambiental a uma fonte de renda",
      paragrafos: [
        "Áreas degradadas e reservas a recuperar costumam ser vistas só como custo e obrigação legal. Bem conduzida, a recuperação pode virar uma fonte de renda — pela venda de crédito de carbono.",
        "A SBA organiza o projeto — análise da área, plano de recuperação e preparação do crédito de carbono — e reúne os parceiros técnicos que executam e certificam.",
      ],
    },
    beneficios: [
      { titulo: "Conformidade", texto: "Atende a obrigações ambientais e a compromissos de restauração." },
      { titulo: "Áreas recuperadas", texto: "Recuperação da vegetação e ligação entre as áreas verdes." },
      { titulo: "Receita com carbono", texto: "Potencial de geração e venda de crédito de carbono." },
      { titulo: "Projeto certificável", texto: "A SBA reúne quem executa e quem certifica o crédito." },
    ],
    aplicacoes: [
      "Áreas de preservação a recuperar (as margens de rio e a parte de mata que a lei exige manter)",
      "Áreas degradadas e contaminadas",
      "Margens de rios e nascentes",
      "Recuperação de áreas exigida como contrapartida de obras",
      "Projetos de geração de crédito de carbono",
    ],
    faq: [
      {
        q: "Dá para gerar receita com carbono?",
        a: "É um potencial, não uma promessa: depende da área, do projeto e da certificação. A SBA organiza o projeto e reúne quem certifica, avaliando caso a caso.",
      },
      {
        q: "Quem faz o plantio e o manejo?",
        a: "Parceiros técnicos especializados. A SBA organiza o projeto e reúne quem executa e quem certifica.",
      },
    ],
    cta: {
      titulo: "Tem áreas a recuperar ou potencial de carbono?",
      texto: "Fale com a SBA. Avaliamos a área e o caminho; o custo depende do caso e informamos depois da análise.",
    },
  },

  "saneamento-agua": {
    id: "saneamento-agua",
    eyebrow: "Ambiental",
    titulo: "Água e esgoto tratados, dentro da nova lei do saneamento.",
    subtitulo:
      "A SBA organiza projetos de tratamento de água (as ETAs) e de esgoto (as ETEs), de acordo com a nova lei federal do saneamento, com toda a parte técnica e o financiamento já organizados.",
    imagem: saneamento,
    oQueE: {
      titulo: "Saneamento é meta e é saúde",
      paragrafos: [
        "A nova lei federal do saneamento (Lei 14.026/2020) obriga levar água tratada e esgoto a toda a população até 2033. Para muitos municípios, o desafio não é só técnico — é organizar o projeto e o financiamento que tornam a obra possível, sob risco de perder prazos e contratos.",
        "A SBA organiza esse caminho: avalia a situação, projeta a estação de tratamento de água (ETA) e a de esgoto (ETE) e reúne os parceiros de engenharia, operação e jurídico que executam.",
      ],
    },
    beneficios: [
      { titulo: "Dentro da lei", texto: "Cumprimento das metas da nova lei do saneamento." },
      { titulo: "Saúde pública", texto: "Água tratada e esgoto adequado reduzem doenças e custos de saúde." },
      { titulo: "Projeto viável", texto: "Parte técnica e financiamento organizados para a obra sair do papel." },
      { titulo: "Parceiros certos", texto: "A SBA reúne quem projeta, executa e opera." },
    ],
    aplicacoes: [
      "Tratamento de água (ETA)",
      "Tratamento de esgoto (ETE)",
      "Ampliação de rede e ligações domiciliares",
      "Adequação às metas da nova lei do saneamento",
      "Organização técnica e financeira do projeto",
    ],
    faq: [
      {
        q: "Isso ajuda a cumprir a nova lei do saneamento?",
        a: "Sim. A lei fixou metas de levar água e esgoto a todos até 2033; a SBA organiza o projeto e o financiamento que tornam a obra possível.",
      },
      {
        q: "A SBA opera o saneamento?",
        a: "Não. Organizamos o projeto e reunimos os parceiros de engenharia, operação e jurídico que executam e operam.",
      },
    ],
    cta: {
      titulo: "Sua cidade precisa avançar em água e esgoto?",
      texto: "Fale com a SBA. Avaliamos a situação e os caminhos; o custo depende do caso e informamos depois da análise.",
    },
  },

  "eventos-cultura": {
    id: "eventos-cultura",
    eyebrow: "Cultura",
    titulo: "Projetos culturais que saem do papel.",
    subtitulo:
      "A SBA organiza e ajuda a buscar recursos para eventos e projetos culturais da cidade — com organização, parceiros e as leis de incentivo à cultura.",
    imagem: cultura,
    oQueE: {
      titulo: "Cultura também precisa de estrutura",
      paragrafos: [
        "Eventos e projetos culturais movimentam a economia local e a identidade da cidade — mas muitas vezes esbarram na falta de organização e de recursos.",
        "A SBA organiza o projeto, reúne os parceiros e cuida da busca de recursos — inclusive pelas leis de incentivo à cultura, que permitem financiar projetos com renúncia fiscal (Lei Paulo Gustavo, Lei Aldir Blanc, ProAC-SP e Lei Rouanet) —, para que a ideia vire um evento ou projeto de verdade.",
      ],
    },
    beneficios: [
      { titulo: "Economia local", texto: "Movimenta comércio, turismo e empregos na cidade." },
      { titulo: "Busca de recursos", texto: "Organização da busca de recursos, inclusive pelas leis de incentivo à cultura." },
      { titulo: "Projeto viável", texto: "Da ideia à execução, com os parceiros certos." },
      { titulo: "Identidade", texto: "Fortalece a cultura e a imagem do município." },
    ],
    aplicacoes: [
      "Festivais, festas cívicas e datas do município",
      "Projetos por leis de incentivo à cultura",
      "Eventos de turismo e economia local",
      "Projetos culturais em escolas e espaços públicos",
      "Captação de recursos e prestação de contas",
    ],
    faq: [
      {
        q: "Como funciona a busca de recursos?",
        a: "Organizamos o projeto e a busca de recursos, inclusive pelas leis de incentivo à cultura, com a organização e a prestação de contas necessárias.",
      },
      {
        q: "A SBA produz o evento?",
        a: "A SBA organiza o projeto e torna ele possível; quem produz o evento são os parceiros e produtores certos para cada caso.",
      },
    ],
    cta: {
      titulo: "Tem um evento ou projeto cultural em mente?",
      texto: "Fale com a SBA. Organizamos e ajudamos a viabilizar; o custo depende do caso e informamos depois da análise.",
    },
  },
};

// ============================================================================
// Sub-páginas do eixo RESÍDUOS — rota própria `/residuos/:slug` (2026-08-26).
//
// POR QUE UM MAPA SEPARADO (e não entrar em LANDINGS):
// se estas entrassem em LANDINGS, a MESMA página existiria em dois endereços
// (`/solucoes/x` e `/residuos/x`) = conteúdo duplicado, que divide a força e
// confunde o buscador. Mapa separado => um conteúdo, um endereço.
//
// REGRA DE CONTEÚDO: cada uma responde algo que as outras NÃO respondem, com
// base legal própria (consórcio = Lei 11.107/2005 · prefeitura = Lei 14.026/2020
// · biometano = modelo de investimento). Três páginas quase iguais seriam
// "doorway pages", que o buscador pune. Nenhum número novo foi inventado: tudo
// vem do FAQ de `/residuos`, das leis citadas ou é "sob consulta" (regra do README).
// ============================================================================
export const LANDINGS_RESIDUOS: Record<string, Landing> = {
  "consorcio-intermunicipal-residuos": {
    id: "consorcio-intermunicipal-residuos",
    eyebrow: "Resíduos & Aproveitamento · Consórcios",
    titulo: "Consórcio intermunicipal de resíduos sólidos: como viabilizar a usina",
    subtitulo:
      "Sozinho, um município pequeno raramente tem volume para uma usina. Em consórcio, quase sempre tem. A SBA organiza o projeto que atende todos os municípios do arranjo — da parte técnica ao modelo de contrato.",
    imagem: floresta,
    oQueE: {
      titulo: "O que é um consórcio intermunicipal de resíduos",
      paragrafos: [
        "Municípios vizinhos se unem por lei (Lei 11.107/2005) e passam a operar como uma pessoa jurídica única na destinação dos resíduos. Assim é possível construir UMA usina que atende TODOS os municípios do consórcio, dividindo o investimento e a operação.",
        "É o que resolve o problema da escala. Um município de 30 mil habitantes gera algo entre 24 e 30 toneladas por dia (a referência pública de geração é de 0,8 a 1 kg por habitante por dia). Isso está na faixa mínima dos sistemas do parceiro CSTR para resíduo urbano, que trabalham entre 50 e 300 toneladas por dia. Um arranjo de três a cinco municípios da mesma região facilmente ultrapassa o piso.",
        "A SBA não constrói a usina e não opera o sistema: ela organiza o projeto e reúne o consórcio, o operador, a tecnologia e o jurídico até o contrato.",
      ],
    },
    beneficios: [
      { titulo: "Escala que nenhum município tem sozinho", texto: "O volume somado do arranjo viabiliza um sistema que, isolado, não fecharia conta em quase nenhuma prefeitura pequena ou média." },
      { titulo: "Investimento dividido", texto: "O custo do sistema e da operação se reparte entre os municípios do consórcio, em vez de pesar no orçamento de um só." },
      { titulo: "Uma solução legal para todos de uma vez", texto: "O arranjo resolve a destinação adequada exigida pelo Novo Marco do Saneamento (Lei 14.026/2020) para todos os municípios participantes." },
      { titulo: "Modelo de contrato definido antes de assinar", texto: "A SBA estuda o caso e ajuda a definir quem investe e como se remunera — antes do contrato, não depois." },
    ],
    aplicacoes: [
      "Consórcios públicos já constituídos que precisam estruturar a destinação final",
      "Grupos de municípios vizinhos que ainda não formalizaram o arranjo",
      "Arranjos regionais que buscam apoio federal para estruturar a concessão",
      "Municípios que precisam encerrar lixão e não têm escala isolada",
    ],
    faq: [
      { q: "Como funciona um consórcio intermunicipal de resíduos?", a: "Municípios vizinhos se unem por lei (Lei 11.107/2005) e operam como uma pessoa jurídica única na destinação dos resíduos. Assim é possível construir UMA usina que atende TODOS os municípios do consórcio, dividindo o investimento e a operação — dá escala mesmo para prefeituras pequenas, que sozinhas não teriam volume." },
      { q: "Município pequeno tem escala para participar?", a: "Em consórcio, quase sempre sim. Um município de 30 mil habitantes gera cerca de 24 a 30 toneladas por dia (referência pública: 0,8 a 1 kg por habitante por dia). Um arranjo de três a cinco municípios da mesma região facilmente ultrapassa o piso dos sistemas, que fica na faixa de 50 a 300 toneladas por dia." },
      { q: "O consórcio precisa estar formalizado antes de falar com a SBA?", a: "Não. A conversa pode começar antes: parte do trabalho é justamente entender qual arranjo faz sentido e o que precisa existir juridicamente para o projeto ser possível." },
      { q: "Quem paga a usina no modelo de consórcio?", a: "Depende do modelo escolhido. Nos três mais comuns: o consórcio paga direto, com recurso público e financiamento; o operador privado investe e cobra tarifa por tonelada tratada (concessão); ou um modelo híbrido, em que o poder público entra com a área e a coleta e o operador entra com capital e tecnologia. A SBA estuda o caso antes do contrato." },
    ],
    parceiro: { nota: "A tecnologia de tratamento é do parceiro CSTR. A SBA organiza o projeto; o operador executa.", href: "https://cstr.eco.br" },
    cta: { titulo: "Vamos avaliar o seu arranjo regional", texto: "A primeira leitura da oportunidade é sem custo e serve para saber se faz sentido seguir." },
  },

  "rsu-prefeitura": {
    id: "rsu-prefeitura",
    eyebrow: "Resíduos & Aproveitamento · Prefeituras",
    titulo: "Destinação de resíduos sólidos urbanos para prefeituras",
    subtitulo:
      "O Novo Marco do Saneamento acabou com os lixões. O município que ainda depende de um está fora da lei — e o risco não é só ambiental: é repasse federal bloqueado e crédito fechado nos bancos oficiais.",
    imagem: floresta,
    oQueE: {
      titulo: "O que mudou para o seu município",
      paragrafos: [
        "A Lei 14.026/2020, o Novo Marco do Saneamento, exige o fim dos lixões e a destinação final ambientalmente adequada dos resíduos. O município que ainda usa lixão a céu aberto está fora da lei.",
        "As consequências práticas não são abstratas: repasses federais podem ser bloqueados, o crédito nos bancos oficiais fecha e o município pode responder na justiça. A mesma lei incentiva soluções regionais e permite ao município cobrar taxa específica de coleta — a chamada taxa de lixo — que dá lastro financeiro ao projeto.",
        "A alternativa ao aterro é a usina. Aterro é destino final: o resíduo fica enterrado e o município paga pelo transporte, pela área e pelo passivo ambiental. Na usina, o resíduo entra e sai transformado em energia, biometano, biofertilizante e recicláveis. O aterro é despesa; a usina, bem dimensionada, pode gerar receita nova ou pelo menos zerar o custo da destinação.",
      ],
    },
    beneficios: [
      { titulo: "Sai da irregularidade", texto: "Resolve a exigência de destinação ambientalmente adequada do Novo Marco do Saneamento." },
      { titulo: "Destrava repasse e crédito", texto: "A irregularidade na destinação é o que bloqueia repasse federal e fecha crédito nos bancos oficiais." },
      { titulo: "Troca despesa por receita", texto: "O que hoje é custo de transporte, área e passivo ambiental pode virar energia, biometano, biofertilizante e recicláveis." },
      { titulo: "Lastro financeiro previsto em lei", texto: "A própria lei permite a cobrança de taxa específica de coleta, que sustenta o projeto financeiramente." },
    ],
    aplicacoes: [
      "Prefeituras que ainda dependem de lixão a céu aberto",
      "Municípios com repasse federal bloqueado por irregularidade na destinação",
      "Prefeituras cujo contrato de aterro está vencendo ou ficou caro demais",
      "Municípios que precisam estruturar a cobrança da taxa de lixo",
    ],
    faq: [
      { q: "Como o Novo Marco do Saneamento muda a destinação de resíduos do meu município?", a: "O Marco exige o fim dos lixões e a destinação final ambientalmente adequada. O município que ainda usa lixão a céu aberto está fora da lei — e pode ter repasses federais bloqueados, ficar sem crédito nos bancos oficiais e responder na justiça. A mesma lei incentiva soluções regionais (consórcios) e permite ao município cobrar taxa específica de coleta, que dá lastro financeiro ao projeto." },
      { q: "Qual a diferença entre aterro sanitário e usina de tratamento?", a: "Aterro é destino final: o resíduo fica enterrado e o município paga pelo transporte, pela área e pelo passivo ambiental. A usina é o oposto — o resíduo entra e sai transformado em energia, biometano, biofertilizante e materiais recicláveis. O aterro é despesa; a usina, quando bem dimensionada, pode gerar receita nova ou pelo menos zerar o custo da destinação." },
      { q: "E se o meu município não tiver volume sozinho?", a: "É o caso mais comum em prefeituras pequenas, e a saída costuma ser o consórcio intermunicipal: municípios vizinhos se unem por lei e viabilizam uma usina que atende todos, dividindo investimento e operação." },
      { q: "Quanto custa para a prefeitura?", a: "A primeira leitura da oportunidade é sem custo. O investimento do sistema depende do modelo escolhido — poder público, operador privado por concessão, ou híbrido — e os valores são sob consulta, definidos a partir do estudo do caso." },
    ],
    parceiro: { nota: "A tecnologia de tratamento é do parceiro CSTR. A SBA organiza o projeto; o operador executa.", href: "https://cstr.eco.br" },
    cta: { titulo: "Solicite a primeira leitura da sua cidade", texto: "Sem custo e sem compromisso. Serve para entender se o projeto faz sentido no seu município." },
  },

  "usina-biometano-municipal": {
    id: "usina-biometano-municipal",
    eyebrow: "Resíduos & Aproveitamento · Biometano",
    titulo: "Usina de biometano municipal: do lixo orgânico ao gás",
    subtitulo:
      "O resíduo orgânico do município vira biogás e, purificado, vira biometano — equivalente ao gás natural. Pode abastecer a frota da prefeitura, ser injetado na rede ou ser vendido para indústrias vizinhas.",
    imagem: floresta,
    oQueE: {
      titulo: "O que é biometano municipal",
      paragrafos: [
        "Biometano é o biogás — produzido pela decomposição controlada do resíduo orgânico — que passou por purificação até ficar equivalente ao gás natural. Municipal significa que o insumo é o próprio lixo urbano da cidade.",
        "Depois de purificado, o biometano pode ser injetado na rede de gás, virar combustível para a frota da prefeitura ou ser vendido a indústrias vizinhas. É o que transforma a destinação de resíduo, que hoje é uma linha de despesa, em um ativo com receita própria.",
        "A pergunta que decide o projeto não é técnica, é de modelo: quem investe. A SBA estuda o caso e ajuda a definir isso antes do contrato.",
      ],
    },
    beneficios: [
      { titulo: "Receita, não só economia", texto: "O gás purificado pode ser vendido ou substituir combustível comprado — é ativo, não apenas corte de custo." },
      { titulo: "Três destinos possíveis para o gás", texto: "Injeção na rede, combustível da frota municipal ou venda para indústrias da região, conforme o que existe por perto." },
      { titulo: "O modelo de investimento definido antes", texto: "Poder público com financiamento, operador privado por concessão, ou híbrido — decidido no estudo, não na assinatura." },
      { titulo: "Aproveita quem já separa", texto: "Município que já tem coleta seletiva funcionando parte de uma posição melhor, porque o orgânico já chega mais limpo." },
    ],
    aplicacoes: [
      "Municípios que já têm coleta seletiva em operação",
      "Cidades com indústria próxima que consome gás",
      "Prefeituras com frota própria significativa",
      "Consórcios que buscam receita para sustentar a operação",
    ],
    faq: [
      { q: "O que é biometano municipal?", a: "Biometano é o biogás (produzido pela decomposição controlada do resíduo orgânico) que passou por purificação até ficar equivalente ao gás natural. Depois de purificado, pode ser injetado na rede de gás, virar combustível para a frota da prefeitura ou ser vendido a indústrias vizinhas. Municipal significa que o insumo é o próprio lixo urbano do município." },
      { q: "Quem paga a usina — a prefeitura ou o operador?", a: "Depende do modelo. Nos três mais comuns: a prefeitura paga direto, com dinheiro público e financiamento; o operador privado paga tudo e cobra uma tarifa mensal por tonelada tratada (concessão); ou um modelo híbrido, em que a prefeitura entra com a área e a coleta e o operador entra com o capital e a tecnologia. A SBA estuda o caso e ajuda a definir o melhor modelo antes do contrato." },
      { q: "Precisa ter coleta seletiva para funcionar?", a: "Ajuda bastante, porque o resíduo orgânico chega mais limpo e o rendimento melhora. Não ter coleta seletiva não inviabiliza o projeto, mas muda o dimensionamento e entra na conta do estudo." },
      { q: "Existe algum projeto em andamento?", a: "Sim. O projeto-farol do parceiro CSTR fica em Congonhas do Campo, em Minas Gerais. É importante ser exato: ele está em construção, e não é um case operacional concluído." },
    ],
    parceiro: { nota: "A tecnologia de tratamento é do parceiro CSTR. A SBA organiza o projeto; o operador executa.", href: "https://cstr.eco.br" },
    cta: { titulo: "Vamos ver se faz sentido na sua cidade", texto: "A primeira leitura é sem custo e indica se o volume e o contexto sustentam o projeto." },
  },
};
