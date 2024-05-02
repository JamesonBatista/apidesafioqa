const germany_json = [
  {
    name: {
      common: "Germany",
      official: "Federal Republic of Germany",
      nativeName: {
        deu: {
          official: "Bundesrepublik Deutschland",
          common: "Deutschland",
        },
      },
    },
    tld: [".de"],
    cca2: "DE",
    ccn3: "276",
    cca3: "DEU",
    cioc: "GER",
    independent: true,
    status: "officially-assigned",
    unMember: true,
    currencies: {
      EUR: {
        name: "Euro",
        symbol: "€",
      },
    },
    idd: {
      root: "+4",
      suffixes: ["9"],
    },
    capital: ["Berlin"],
    altSpellings: [
      "DE",
      "Federal Republic of Germany",
      "Bundesrepublik Deutschland",
    ],
    region: "Europe",
    subregion: "Western Europe",
    languages: {
      deu: "German",
    },
    translations: {
      ara: {
        official: "جمهورية ألمانيا الاتحادية",
        common: "ألمانيا",
      },
      bre: {
        official: "Republik Kevreadel Alamagn",
        common: "Alamagn",
      },
      ces: {
        official: "Spolková republika Německo",
        common: "Německo",
      },
      cym: {
        official: "Federal Republic of Germany",
        common: "Germany",
      },
      deu: {
        official: "Bundesrepublik Deutschland",
        common: "Deutschland",
      },
      est: {
        official: "Saksamaa Liitvabariik",
        common: "Saksamaa",
      },
      fin: {
        official: "Saksan liittotasavalta",
        common: "Saksa",
      },
      fra: {
        official: "République fédérale d'Allemagne",
        common: "Allemagne",
      },
      hrv: {
        official: "Njemačka Federativna Republika",
        common: "Njemačka",
      },
      hun: {
        official: "Német Szövetségi Köztársaság",
        common: "Németország",
      },
      ita: {
        official: "Repubblica federale di Germania",
        common: "Germania",
      },
      jpn: {
        official: "ドイツ連邦共和国",
        common: "ドイツ",
      },
      kor: {
        official: "독일 연방 공화국",
        common: "독일",
      },
      nld: {
        official: "Bondsrepubliek Duitsland",
        common: "Duitsland",
      },
      per: {
        official: "جمهوری فدرال آلمان",
        common: "آلمان",
      },
      pol: {
        official: "Republika Federalna Niemiec",
        common: "Niemcy",
      },
      por: {
        official: "República Federal da Alemanha",
        common: "Alemanha",
      },
      rus: {
        official: "Федеративная Республика Германия",
        common: "Германия",
      },
      slk: {
        official: "Nemecká spolková republika",
        common: "Nemecko",
      },
      spa: {
        official: "República Federal de Alemania",
        common: "Alemania",
      },
      srp: {
        official: "Савезна Република Немачка",
        common: "Немачка",
      },
      swe: {
        official: "Förbundsrepubliken Tyskland",
        common: "Tyskland",
      },
      tur: {
        official: "Almanya Federal Cumhuriyeti",
        common: "Almanya",
      },
      urd: {
        official: "وفاقی جمہوریہ جرمنی",
        common: "جرمنی",
      },
      zho: {
        official: "德意志联邦共和国",
        common: "德国",
      },
    },
    latlng: [51, 9],
    landlocked: false,
    borders: ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
    area: 357114,
    demonyms: {
      eng: {
        f: "German",
        m: "German",
      },
      fra: {
        f: "Allemande",
        m: "Allemand",
      },
    },
    flag: "🇩🇪",
    maps: {
      googleMaps: "https://goo.gl/maps/mD9FBMq1nvXUBrkv6",
      openStreetMaps: "https://www.openstreetmap.org/relation/51477",
    },
    population: 83240525,
    gini: {
      2016: 31.9,
    },
    fifa: "GER",
    car: {
      signs: ["DY"],
      side: "right",
    },
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
    flags: {
      png: "https://flagcdn.com/w320/de.png",
      svg: "https://flagcdn.com/de.svg",
      alt: "The flag of Germany is composed of three equal horizontal bands of black, red and gold.",
    },
    coatOfArms: {
      png: "https://mainfacts.com/media/images/coats_of_arms/de.png",
      svg: "https://mainfacts.com/media/images/coats_of_arms/de.svg",
    },
    startOfWeek: "monday",
    capitalInfo: {
      latlng: [52.52, 13.4],
    },
    postalCode: {
      format: "#####",
      regex: "^(\\d{5})$",
    },
  },
];
export const json_1 = {
  produtos: [
    { id: 1, nome: "Notebook", preco: 4500.0, disponivel: true },
    { id: 2, nome: "Smartphone", preco: 2300.5, disponivel: false },
    { id: 3, nome: "Tablet", preco: 1500.99, disponivel: true },
  ],
  usuario: {
    nome: "João Silva",
    idade: 28,
    email: "joaosilva@example.com",
  },
  configuracoes: {
    notificacoes: true,
    tema: "escuro",
    idioma: "pt-BR",
  },
  endereco: {
    rua: "Rua dos Bobos",
    numero: 0,
    cidade: "Cidade Nenhuma",
    estado: "SP",
    cep: "00000-000",
  },
  historicoDePedidos: [
    { pedidoId: 1001, produto: "Notebook", quantidade: 1, precoTotal: 4500.0 },
    {
      pedidoId: 1002,
      produto: "Smartphone",
      quantidade: 2,
      precoTotal: 4601.0,
    },
  ],
  carrinhoAtual: {
    produtos: [
      { produtoId: 2, quantidade: 1 },
      { produtoId: 3, quantidade: 2 },
    ],
    precoTotal: 7501.98,
  },
  metodoDePagamento: {
    cartao: { numero: "1234 5678 9012 3456", validade: "12/2025", cvv: "123" },
  },
  contato: {
    telefone: "(11) 99999-9999",
    emailSecundario: "contato@joaosilva.com",
  },
  assinaturaNewsletter: true,
  ultimaCompra: {
    data: "2023-04-25",
    valor: 2300.5,
    produto: "Smartphone",
  },
  recomendacoes: [
    { produto: "Capa Smartphone", preco: 59.9 },
    { produto: "Mouse Wireless", preco: 120.0 },
  ],
  perfilPublico: false,
  estatisticasDeUso: {
    horasConectado: 120,
    diasAtivo: 30,
  },
  amigos: [
    { nome: "Maria", contato: "maria@example.com" },
    { nome: "Pedro", contato: "pedro@example.com" },
  ],
  preferencias: {
    categoriasFavoritas: ["eletrônicos", "livros"],
    notificarPromocoes: true,
  },
};
export const json_2 = {
  usuario: {
    informacoesPessoais: {
      nome: "João Silva",
      idade: 28,
      contatos: {
        emailPrincipal: "joaosilva@example.com",
        emailSecundario: "joao.silva@outlook.com",
        telefone: "(11) 99999-9999",
      },
      endereco: {
        rua: "Rua dos Bobos",
        numero: 0,
        complemento: "Apto 101",
        cidade: "Cidade Nenhuma",
        estado: "SP",
        cep: "00000-000",
      },
    },
    preferencias: {
      tema: "escuro",
      idioma: "pt-BR",
      categoriasFavoritas: ["eletrônicos", "livros", "jogos"],
      notificarPromocoes: true,
    },
    historicoDeCompras: [
      {
        pedidoId: 1001,
        itens: [
          { produtoId: 1, nome: "Notebook", quantidade: 1, preco: 4500.0 },
          { produtoId: 5, nome: "Mouse Wireless", quantidade: 1, preco: 120.0 },
        ],
        total: 4620.0,
        data: "2023-04-25",
      },
      {
        pedidoId: 1002,
        itens: [
          { produtoId: 2, nome: "Smartphone", quantidade: 2, preco: 2300.5 },
        ],
        total: 4601.0,
        data: "2023-05-01",
      },
    ],
    configuracoesDeConta: {
      assinaturaNewsletter: true,
      receberSMS: true,
      metodosDePagamento: [
        {
          tipo: "cartaoDeCredito",
          detalhes: {
            numero: "1234 5678 9012 3456",
            validade: "12/2025",
            cvv: "123",
          },
        },
        {
          tipo: "PayPal",
          email: "joao.paypal@example.com",
        },
      ],
    },
    estatisticasDeUso: {
      horasConectado: 120,
      diasAtivo: 30,
      logins: {
        ultimoLogin: "2024-04-30T08:30:00Z",
        dispositivosUsados: [
          { tipo: "smartphone", modelo: "iPhone 13" },
          { tipo: "laptop", modelo: "Dell XPS 15" },
        ],
      },
    },
    amigos: [
      { nome: "Maria", contato: "maria@example.com" },
      { nome: "Pedro", contato: "pedro@example.com" },
    ],
    recomendacoesDeProdutos: [
      { produtoId: 7, nome: "Capa para Smartphone", preco: 59.9 },
      { produtoId: 9, nome: "Carregador Portátil", preco: 199.99 },
    ],
  },
};
export const json_3 = {
  evento: {
    nome: "Conferência de Tecnologia 2024",
    local: {
      nome: "Centro de Convenções TechWorld",
      endereco: {
        rua: "Avenida Inovação, 500",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01310-000",
      },
    },
    data: "2024-08-15",
    organizadores: [
      { nome: "TechEvents Ltda", contato: "info@techevents.com" },
      { nome: "Innovation Hub", contato: "contact@innovationhub.com" },
    ],
    programacao: [
      {
        dia: "2024-08-15",
        sessoes: [
          {
            titulo: "O futuro da IA",
            horario: "09:00 - 10:30",
            palestrante: "Dr. Ana Borges",
            sala: "1A",
            descricao:
              "Explorando as novas tendências e tecnologias em inteligência artificial.",
          },
          {
            titulo: "Blockchain no mundo real",
            horario: "11:00 - 12:30",
            palestrante: "Carlos Silva",
            sala: "1B",
            descricao:
              "Aplicações práticas de blockchain além das criptomoedas.",
          },
        ],
      },
    ],
    participantes: [
      {
        nome: "João Costa",
        email: "joao.costa@example.com",
        tipo: "Profissional",
        sessoesInscritas: ["O futuro da IA", "Blockchain no mundo real"],
      },
      {
        nome: "Maria Ferreira",
        email: "maria.ferreira@example.com",
        tipo: "Estudante",
        sessoesInscritas: ["Blockchain no mundo real"],
      },
    ],
    feedbacks: [
      {
        sessao: "O futuro da IA",
        comentarios: [
          {
            participante: "João Costa",
            comentario: "Excelente palestra, muito informativa!",
            avaliacao: 5,
          },
        ],
      },
      {
        sessao: "Blockchain no mundo real",
        comentarios: [
          {
            participante: "Maria Ferreira",
            comentario: "Bem organizado e muito esclarecedor.",
            avaliacao: 4,
          },
        ],
      },
    ],
    sustentabilidade: {
      politicas: [
        "Sem plástico",
        "Material reciclado",
        "Compensação de carbono",
      ],
      parceiros: [
        { nome: "EcoWorld", contato: "support@ecoworld.com" },
        { nome: "GreenTech Solutions", contato: "info@greentechsolutions.com" },
      ],
    },
  },
};

export const json_4 = {
  linguagensDeProgramacao: [
    {
      id: 1,
      nome: "Python",
      criador: {
        nome: "Guido van Rossum",
        nacionalidade: "Holandesa",
      },
      ano: 1991,
      paradigmas: ["Orientado a objetos", "Imperativo", "Funcional"],
      aplicacoes: ["Web", "Data Science", "Automacao", "AI/ML"],
      validacoesEspecificas: {
        formatoNome: "^([A-Z][a-z]+)+$",
        anoMinimo: 1980,
      },
    },
    {
      id: 2,
      nome: "JavaScript",
      criador: {
        nome: "Brendan Eich",
        nacionalidade: "Americana",
      },
      ano: 1995,
      paradigmas: ["Event-driven", "Funcional", "Imperativo"],
      aplicacoes: ["Web", "Servidores", "Aplicações Móveis"],
      validacoesEspecificas: {
        formatoNome: "^([A-Z][a-z]+)+$",
        anoMinimo: 1990,
      },
    },
  ],
  etnologia: [
    {
      id: 1,
      continente: "África",
      culturas: [
        {
          id: 1,
          nome: "Maasai",
          lingua: "Maa",
          tradicionalVestimenta: "Shúkà",
          rituais: ["Eunoto", "Olng'esherr"],
          validacoesEspecificas: {
            linguaFormato: "^[A-Za-z]+$",
            numeroDeRituais: {
              min: 2,
              max: 5,
            },
          },
        },
        {
          id: 2,
          nome: "Zulu",
          lingua: "Zulu",
          tradicionalVestimenta: "Isidwaba",
          rituais: ["Umhlanga", "Ukweshwama"],
          validacoesEspecificas: {
            linguaFormato: "^[A-Za-z]+$",
            numeroDeRituais: {
              min: 1,
              max: 4,
            },
          },
        },
      ],
    },
  ],
  validacaoGlobal: {
    idsUnicos: true,
    referenciaCruzada: {
      linguagensCulturas: {
        1: ["1", "2"],
        2: ["1"],
      },
    },
  },
};

export const json_5 = {
  empresa: {
    nome: "DevSolutions",
    setores: [
      {
        id: 1,
        nome: "Desenvolvimento",
        projetos: [
          {
            id: 101,
            nome: "Projeto Alpha",
            linguagensUsadas: [
              { id: 1, nome: "Python", versao: "3.8" },
              { id: 2, nome: "JavaScript", versao: "ES6" },
            ],
            inicio: "2023-01-01",
            prazo: "2023-12-31",
            status: "ativo",
            equipes: [
              {
                id: 201,
                nome: "Frontend",
                membros: [
                  { id: 301, nome: "Alice", cargo: "Desenvolvedora Frontend" },
                ],
                tarefas: [
                  {
                    id: 401,
                    descricao: "Criar UI do Dashboard",
                    status: "concluida",
                  },
                  { id: 402, descricao: "Integrar API", status: "pendente" },
                ],
              },
              {
                id: 202,
                nome: "Backend",
                membros: [
                  { id: 302, nome: "Bob", cargo: "Desenvolvedor Backend" },
                ],
                tarefas: [
                  {
                    id: 403,
                    descricao: "Desenvolver APIs",
                    status: "em andamento",
                  },
                  {
                    id: 404,
                    descricao: "Otimizar Banco de Dados",
                    status: "pendente",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        nome: "Testes",
        projetos: [
          {
            id: 102,
            nome: "Projeto Beta",
            linguagensUsadas: [{ id: 3, nome: "Java", versao: "11" }],
            inicio: "2023-03-15",
            prazo: "2023-10-15",
            status: "ativo",
            equipes: [
              {
                id: 203,
                nome: "QA",
                membros: [
                  { id: 303, nome: "Carol", cargo: "Engenheira de QA" },
                ],
                tarefas: [
                  {
                    id: 405,
                    descricao: "Testes de Integração",
                    status: "em andamento",
                  },
                  {
                    id: 406,
                    descricao: "Testes de Regressão",
                    status: "planejada",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const json_6 = {
  agenciaEspacial: "Agência Espacial Internacional",
  veiculosLancadores: [
    {
      id: "VL01",
      nome: "Falcon Heavy",
      capacidadeCarga: "64000 kg",
      primeiroLancamento: "2018-02-06",
      status: "ativo",
    },
    {
      id: "VL02",
      nome: "Ariane 5",
      capacidadeCarga: "21000 kg",
      primeiroLancamento: "1996-06-04",
      status: "ativo",
    },
  ],
  satelites: [
    {
      id: "SAT01",
      nome: "Hubble Space Telescope",
      tipo: "Observatório Espacial",
      veiculoLancadorId: "VL01",
      status: "ativo",
    },
    {
      id: "SAT02",
      nome: "James Webb Space Telescope",
      tipo: "Observatório Espacial",
      veiculoLancadorId: "VL01",
      status: "em preparação",
    },
  ],
  missoes: [
    {
      id: "MISS01",
      nome: "Artemis 1",
      tipo: "Tripulada",
      veiculoLancadorId: "VL01",
      tripulacao: [
        { id: "AST01", nome: "Robert Behnken" },
        { id: "AST02", nome: "Douglas Hurley" },
      ],
      objetivos: [
        "Testar o Sistema de Lançamento Espacial",
        "Preparar para missões lunares futuras",
      ],
      status: "planejada",
    },
    {
      id: "MISS02",
      nome: "Mars Rover Perseverance",
      tipo: "Não tripulada",
      veiculoLancadorId: "VL02",
      objetivos: ["Explorar o ambiente marciano", "Coletar amostras"],
      status: "ativo",
    },
  ],
};

export const json_7 = {
  copasDoMundo: [
    {
      ano: 2018,
      paisSede: "Rússia",
      estadios: [
        { nome: "Luzhniki Stadium", cidade: "Moscou", capacidade: 81000 },
        {
          nome: "Saint Petersburg Stadium",
          cidade: "São Petersburgo",
          capacidade: 68134,
        },
      ],
      equipes: [
        { nome: "Brasil", grupo: "E" },
        { nome: "Alemanha", grupo: "F" },
      ],
      jogos: [
        {
          data: "2018-06-17",
          estadio: "Luzhniki Stadium",
          equipes: ["Brasil", "Suíça"],
          resultado: { Brasil: 1, Suíça: 1 },
        },
        {
          data: "2018-06-27",
          estadio: "Kazan Arena",
          equipes: ["Alemanha", "Coreia do Sul"],
          resultado: { Alemanha: 0, "Coreia do Sul": 2 },
        },
      ],
    },
    {
      ano: 2022,
      paisSede: "Catar",
      estadios: [
        { nome: "Al Bayt Stadium", cidade: "Al Khor", capacidade: 60000 },
        { nome: "Lusail Iconic Stadium", cidade: "Lusail", capacidade: 80000 },
      ],
      equipes: [
        { nome: "França", grupo: "D" },
        { nome: "Argentina", grupo: "C" },
      ],
      jogos: [
        {
          data: "2022-11-18",
          estadio: "Al Bayt Stadium",
          equipes: ["França", "Austrália"],
          resultado: { França: 4, Austrália: 1 },
        },
        {
          data: "2022-11-26",
          estadio: "Lusail Iconic Stadium",
          equipes: ["Argentina", "México"],
          resultado: { Argentina: 2, México: 0 },
        },
      ],
    },
  ],
};

export const json_8 = {
  sistemaDeReservas: {
    voos: [
      {
        id: "V001",
        companhia: "Delta Airlines",
        origem: "Nova York",
        destino: "Londres",
        partida: "2024-05-01T08:00:00Z",
        chegada: "2024-05-01T20:00:00Z",
        preco: 750,
      },
      {
        id: "V002",
        companhia: "British Airways",
        origem: "Londres",
        destino: "Paris",
        partida: "2024-05-02T09:00:00Z",
        chegada: "2024-05-02T10:00:00Z",
        preco: 150,
      },
    ],
    hoteis: [
      {
        id: "H001",
        nome: "The Ritz London",
        cidade: "Londres",
        quartosDisponiveis: [
          { tipo: "Deluxe", precoPorNoite: 300, capacidade: 2 },
          { tipo: "Suite", precoPorNoite: 500, capacidade: 4 },
        ],
      },
      {
        id: "H002",
        nome: "Le Meurice",
        cidade: "Paris",
        quartosDisponiveis: [
          { tipo: "Standard", precoPorNoite: 350, capacidade: 2 },
          { tipo: "Presidential", precoPorNoite: 900, capacidade: 3 },
        ],
      },
    ],
    veiculos: [
      {
        id: "C001",
        tipo: "Carro",
        modelo: "Toyota Corolla",
        localRetirada: "Londres",
        precoPorDia: 60,
        disponibilidade: ["2024-05-02", "2024-05-03"],
      },
      {
        id: "C002",
        tipo: "SUV",
        modelo: "Range Rover Evoque",
        localRetirada: "Paris",
        precoPorDia: 100,
        disponibilidade: ["2024-05-03", "2024-05-04"],
      },
    ],
  },
  reservas: [
    {
      cliente: "John Doe",
      itensReservados: [
        { tipo: "voo", id: "V001" },
        {
          tipo: "hotel",
          id: "H001",
          quarto: "Suite",
          dias: ["2024-05-01", "2024-05-02"],
        },
        { tipo: "veiculo", id: "C001", dias: ["2024-05-02"] },
      ],
    },
    {
      cliente: "Alice Smith",
      itensReservados: [
        { tipo: "voo", id: "V002" },
        {
          tipo: "hotel",
          id: "H002",
          quarto: "Presidential",
          dias: ["2024-05-02", "2024-05-03"],
        },
        { tipo: "veiculo", id: "C002", dias: ["2024-05-03"] },
      ],
    },
  ],
};

export const json_9 = {
  copaDoMundo: {
    jogosDoBrasil: [
      {
        id: 1,
        adversario: "Equipe A",
        resultado: "Vitória",
        placar: "3-1",
        detalhes: {
          gols: [
            { jogador: "Neymar", minuto: 10 },
            { jogador: "Gabriel Jesus", minuto: 25 },
            { jogador: "Coutinho", minuto: 70 },
          ],
          faltas: [
            { jogador: "Casemiro", minuto: 20 },
            { jogador: "Marquinhos", minuto: 45 },
          ],
          cartoes: [{ jogador: "Marcelo", tipo: "Amarelo", minuto: 60 }],
        },
      },
      {
        id: 2,
        adversario: "Equipe B",
        resultado: "Empate",
        placar: "2-2",
        detalhes: {
          gols: [
            { jogador: "Neymar", minuto: 15 },
            { jogador: "Gabriel Jesus", minuto: 80 },
          ],
          faltas: [
            { jogador: "Casemiro", minuto: 30 },
            { jogador: "Marquinhos", minuto: 55 },
          ],
          cartoes: [
            { jogador: "Marcelo", tipo: "Amarelo", minuto: 45 },
            { jogador: "Coutinho", tipo: "Vermelho", minuto: 70 },
          ],
        },
      },
      {
        id: 3,
        adversario: "Equipe C",
        resultado: "Vitória",
        placar: "3-0",
        detalhes: {
          gols: [
            { jogador: "Neymar", minuto: 20 },
            { jogador: "Gabriel Jesus", minuto: 35 },
            { jogador: "Firmino", minuto: 75 },
          ],
          faltas: [
            { jogador: "Casemiro", minuto: 15 },
            { jogador: "Marquinhos", minuto: 40 },
          ],
          cartoes: [{ jogador: "Marcelo", tipo: "Amarelo", minuto: 50 }],
        },
      },
      {
        id: 4,
        adversario: "Equipe D",
        resultado: "Derrota",
        placar: "1-2",
        detalhes: {
          gols: [{ jogador: "Neymar", minuto: 55 }],
          faltas: [
            { jogador: "Casemiro", minuto: 10 },
            { jogador: "Marquinhos", minuto: 30 },
          ],
          cartoes: [
            { jogador: "Marcelo", tipo: "Amarelo", minuto: 20 },
            { jogador: "Coutinho", tipo: "Amarelo", minuto: 40 },
            { jogador: "Gabriel Jesus", tipo: "Vermelho", minuto: 70 },
          ],
        },
      },
      {
        id: 5,
        adversario: "Equipe E",
        resultado: "Vitória",
        placar: "3-2",
        detalhes: {
          gols: [
            { jogador: "Neymar", minuto: 10 },
            { jogador: "Gabriel Jesus", minuto: 45 },
            { jogador: "Firmino", minuto: 70 },
          ],
          faltas: [
            { jogador: "Casemiro", minuto: 25 },
            { jogador: "Marquinhos", minuto: 55 },
          ],
          cartoes: [
            { jogador: "Marcelo", tipo: "Amarelo", minuto: 35 },
            { jogador: "Coutinho", tipo: "Amarelo", minuto: 60 },
          ],
        },
      },
      {
        id: 6,
        adversario: "Equipe F",
        resultado: "Vitória",
        placar: "4-2",
        detalhes: {
          gols: [
            { jogador: "Neymar", minuto: 20 },
            { jogador: "Gabriel Jesus", minuto: 43 },
            { jogador: "Firmino", minuto: 60 },
            { jogador: "Neymar", minuto: 90 },
          ],
          faltas: [{ jogador: "Marquinhos", minuto: 55 }],
          cartoes: [{ jogador: "Coutinho", tipo: "Amarelo", minuto: 60 }],
        },
      },
    ],
  },
};
export const json_10 = {
  layers: [
    [
      [
        [
          [
            [
              [
                [
                  [
                    [
                      {
                        success: "OK",
                      },
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
};
export const json_11 = {
  empresa: {
    departamentos: [
      {
        nome: "RH",
        funcionarios: [
          {
            nome: "Ana",
            cargo: "Gerente de RH",
            projetos: [
              {
                nome: "Recrutamento",
                responsavel: {
                  nome: "João",
                  cargo: "Recrutador",
                },
                tarefas: [
                  {
                    descricao: "Seleção de currículos",
                    responsavel: {
                      nome: "Maria",
                      cargo: "Analista de RH",
                    },
                  },
                  {
                    descricao: "Entrevistas",
                    responsavel: {
                      nome: "Pedro",
                      cargo: "Coordenador de RH",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        nome: "TI",
        funcionarios: [
          {
            nome: "Paulo",
            cargo: "Desenvolvedor",
            projetos: [
              {
                nome: "Sistema de Gestão",
                responsavel: {
                  nome: "Luana",
                  cargo: "Analista de Sistemas",
                },
                tarefas: [
                  {
                    descricao: "Desenvolvimento de interface",
                    responsavel: {
                      nome: "Mariana",
                      cargo: "Web Designer",
                    },
                  },
                  {
                    descricao: "Implementação de funcionalidades",
                    responsavel: {
                      nome: "Rafael",
                      cargo: "Programador",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
export const json_12 = [
  {
    users: [
      {
        main: [
          {
            intro: [
              {
                title: "desafio",
                description: "Impossível de validar",
              },
              {
                primeira_camada: [
                  {
                    segunda_camada: [
                      {
                        title_segunda_camada: "difícil chegar aqui",
                      },
                      {
                        terceira_camada: [
                          {
                            title_terceira_camada: "cada vez mais difícil",
                          },
                          {
                            quarta_camada: [
                              {
                                title_quarta_camada: "complicando ainda mais",
                              },
                              {
                                objeto_quarta_camada: {
                                  title:
                                    "as vezes a camada precisa de uns objetos pra complicar",
                                  objeto_da_quarta_camada: {
                                    title:
                                      "Ainda mais complicado, 2 objetos dentro de uma camada",
                                    terceiro_objeto_da_camada:
                                      "é impossível ter um json assim kkk",
                                  },
                                },
                              },
                              {
                                quinta_camada: [
                                  {
                                    title:
                                      "depois da quarta-camada a quinta pode complicar mais ainda",
                                    intro_quinta_camada: [
                                      {
                                        title:
                                          "essa intro complica mais ainda porque nasceu um array dentor de um objeto da quinta camada. Assim não dá.",
                                      },
                                    ],
                                  },
                                  {
                                    sexta_camada: [
                                      {
                                        title:
                                          "ah, sexta camada, normal, simples, sem complicações",
                                      },
                                      {
                                        intro_sexta_camada: {
                                          array_sexta_camada: [
                                            {
                                              title:
                                                "acima tem um array dentro de um objeto, que complicado",
                                            },
                                            {
                                              objeto_sexta_camada: {
                                                title:
                                                  "segundo objeto da camada-array tem outro objeto dentro, impossível isso.",
                                              },
                                            },
                                            {
                                              title_sem_objeto:
                                                "Acho que 6 camadas são suficiente",
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
export const json_13 = {
  user_info: {
    address: [
      {
        primary_address: {
          house: [
            {
              room: {
                items: {
                  "item-1": "escova",
                  "item-2": "creme",
                },
                bad: [
                  {
                    sanders: {
                      airPlane: [
                        {
                          id: 123,
                          name: "God",
                        },
                        {
                          Brooks: [
                            {
                              books: [
                                {
                                  result_final: {
                                    value:
                                      "Parabéns você encontrou o valor final Usando JSONObject",
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};
export const json_14 = {
  users: [
    {
      name: "Wood VIP",
      year: 33,
      color: "red",
      money: 400000,
    },
    {
      name: "Scott not-VIP",
      year: 28,
      color: "blue",
      money: 500000,
    },
    {
      name: "Griffin VIP",
      year: 31,
      color: "pink",
      money: 600000,
    },
    {
      name: "Stephens not-VIP",
      year: 30,
      color: "black",
      money: 700000,
    },
    {
      name: "Hawkins not-VIP",
      year: 47,
      color: "white",
      money: 800000,
    },
  ],
  products: [
    {
      car: "Dynamo",
      color: "red",
      value: 800000,
    },
    {
      car: "Elysium",
      color: "blue",
      value: 300000,
    },
    {
      car: "Dynamics",
      color: "pink",
      value: 400000,
    },
    {
      car: "Fang",
      color: "black",
      value: 700000,
    },
    {
      car: "Prospect",
      color: "white",
      value: 600000,
    },
    {
      VIPs: [
        {
          car: "Ferrari",
        },
        {
          car: "Lamborghini",
        },
        {
          car: "Jaguar",
        },
      ],
    },
  ],
  registration: {
    base: [
      {
        sul: {
          street: "Lago Woolf",
        },
        north: {
          street: "Northland",
        },
      },
    ],
    ceo: "Michael Corbin",
  },
};
export default germany_json;
