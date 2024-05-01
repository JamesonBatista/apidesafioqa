// const fs = require("fs");
import fs from 'fs'
import express from "express";
// const swaggerUi = require("swagger-ui-express");
import swaggerUi from "swagger-ui-express";
// // const YAML = require("js-yaml");
import YAML from "js-yaml";
const app = express();
// const bodyParser = require("body-parser");
import bodyParser from "body-parser";
const port = 3000;
app.use(bodyParser.json());
// const swaggerDocument = YAML.load(fs.readFileSync("./swagger.yaml", "utf8"));
// JSON Nível 1
// Desafio de Validação: Verificar que todos os nomes dentro do array de objetos no arrayDeObjetos começam com letra maiúscula e que os valores sejam todos positivos.
const json_1 = {
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
// JSON Nível 2
// Desafio de Validação: Assegurar que todas as datas em historicoDePedidos estejam no formato YYYY-MM-DD e que nenhum precoTotal exceda a soma dos preços dos produtos multiplicados pela quantidade.
const json_2 = {
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
// JSON Nível 3
// Desafio de Validação: Garantir que o veiculoLancadorId em cada satelites e missoes corresponda a um id válido dos veiculosLancadores e que todos os status estejam dentro dos valores permitidos ["ativo", "inativo", "planejado", "em preparação", "concluído"].
const json_3 = {
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
// JSON Nível 4
// Desafio de Validação Verificar a consistência das linguas e tradicionalVestimenta entre as culturas para garantir que não haja duplicatas no mesmo continente e que cada cultura esteja associada a apenas uma região.
const json_4 = {
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
// JSON Nível 5
// 5 - Desafio de Validação Assegurar que cada id nos projetos, equipes, e tarefas seja único dentro de toda a estrutura do JSON e que o status de cada tarefa esteja em concordância com as dependências de outras tarefas dentro da mesma equipe.
const json_5 = {
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
// JSON Nível 6
// 6 - Desafio de Validação: Validar que cada veiculoLancadorId em satelites e missoes seja não apenas existente, mas também que o primeiroLancamento do veículo seja anterior à data de qualquer missão que ele tenha lançado. Verificar também que cada tripulante em missoes tripuladas possua as certificações necessárias para a missão especificada.
const json_6 = {
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
// Desafio de Validação para JSON Nível 7
// Consistência de Equipes: Assegurar que todas as equipes mencionadas nos jogos estejam listadas nas equipes participantes do torneio correspondente. Isso envolve verificar se as equipes de cada jogo realmente pertencem ao grupo listado para o ano correspondente.
// Resultados Corretos: Validar que os resultados dos jogos refletem de forma precisa os gols marcados, verificando também que não existam discrepâncias nos dados dos jogos, como uma equipe sendo listada como vencedora mas com menos gols que o adversário.
// Capacidade dos Estádios: Verificar que a capacidade dos estádios listada para cada Copa do Mundo seja consistente ou maior do que a capacidade registrada em Copas anteriores, assegurando uma validação temporal de dados.

const json_7 = {
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
// Desafio de Validação para JSON Nível 8
// Disponibilidade de Quartos: Certificar que os quartos de hotel listados nas reservas estejam disponíveis nas datas especificadas pela reserva do cliente, sem sobreposição com outras reservas.
// Compatibilidade de Reservas: Garantir que as datas e locais de voos, hotéis, e veículos se alinhem de forma lógica. Por exemplo, um cliente não pode reservar um voo que chega em Londres e imediatamente depois um carro em Paris sem um voo intermediário.
// Preço Total da Reserva: Verificar o preço total de cada reserva, incluindo todos os voos, estadias em hotéis e locações de veículos para garantir que o total cobrado está correto e que todas as taxas estão incluídas.
const json_8 = {
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
// Desafio de Validação Complexo:
// Total de Gols:
// Calcule o total de gols marcados pelo Brasil ao longo dos sete jogos da Copa do Mundo.
// Total de Faltas:
// Determine o total de faltas cometidas pela equipe brasileira durante toda a competição.
// Total de Cartões:
// Conte quantos cartões amarelos e vermelhos foram recebidos pelos jogadores do Brasil durante os sete jogos.
// Desafio de Relatórios Detalhados:
// Crie uma função que processe o JSON dos jogos do Brasil na Copa do Mundo e retorne um relatório detalhado para cada jogo, incluindo:
// Total de gols marcados pelo Brasil e pelos adversários.
// Nomes dos jogadores que marcaram gols para o Brasil e para os adversários, juntamente com os minutos em que os gols foram marcados.
// Total de faltas cometidas pelo Brasil e pelos adversários.
// Nomes dos jogadores que cometeram faltas para o Brasil e para os adversários, juntamente com os minutos em que as faltas ocorreram.
// Total de cartões (amarelos e vermelhos) recebidos pelo Brasil e pelos adversários.
// Nomes dos jogadores que receberam cartões para o Brasil e para os adversários, juntamente com os minutos em que os cartões foram mostrados.
// Desafio de Estatísticas:
// Calcule a média de gols por jogo marcados pelo Brasil e pelos adversários.
// Identifique o jogo com o maior número de gols.
// Determine o jogador brasileiro com mais gols ao longo da competição.
const json_9 = {
  copaDoMundo: {
    jogosDoBrasil: [
      {
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
// const json_10=
app.get("/json_1", (req, res) => {
  res.send(json_1);
});
app.get("/json_2", (req, res) => {
  res.send(json_2);
});
app.get("/json_3", (req, res) => {
  res.send(json_3);
});

app.get("/json_4", (req, res) => {
  res.send(json_4);
});
app.get("/json_5", (req, res) => {
  res.send(json_5);
});
app.get("/json_6", (req, res) => {
  res.send(json_6);
});
app.get("/json_7", (req, res) => {
  res.send(json_7);
});
app.get("/json_8", (req, res) => {
  res.send(json_8);
});
app.get("/json_9", (req, res) => {
  res.send(json_9);
});
// app.get("/json_10", (req, res) => {
//   res.send(json_10);
// });
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// // init api
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {});

const PORT = 4000;
app.get("/", (req, res) => {
  res.send("API OK");
});
app.listen(PORT, () => {});
