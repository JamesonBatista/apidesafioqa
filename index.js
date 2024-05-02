const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    version: "1.0.0",
    title: "API de JSONs para Treinamento de Validações de QA",
    description:
      "Se desafie aqui, valide todos os JSONs que vão aumentando a complexidade a cada json, depois disso, você está pronto para uma API :)\n\n criado por:\n\n `Jam Batista`  [LinkedIn](https://www.linkedin.com/in/jam-batista-98101015b/)\n\n `Gabriel Lopes`  [LinkedIn](https://www.linkedin.com/in/gabriel-lopes-500b71269/)",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  servers: [
    {
      url: "https://tranquil-cove-07655-38b519d38c2f.herokuapp.com/",
    },
  ],
  tags: [
    {
      name: "APIs",
      description: "praticando automação de testes em apis",
      externalDocs: { description: "Swagger.io", url: "http://swagger.io" },
    },
    {
      name: "Others",
      description: "praticando automação de testes em apis",
      externalDocs: { description: "Swagger.io", url: "http://swagger.io" },
    },
  ],
  paths: {
    "/login": {
      post: {
        tags: ["APIs"],
        summary: "Generate new Bearer token",
        description: "endppoint generate new token",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                username: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
              required: ["username", "password"],
            },
          },
        ],
      },
    },
    "/login_hard": {
      post: {
        tags: ["APIs"],
        summary: "Generate new Bearer token hard validation",
        description: "endppoint generate new token",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                username: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
              required: ["username", "password"],
            },
          },
        ],
      },
    },
    "/json_1": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 1 ",
        description:
          "Este endpoint valida um JSON contendo informações de usuário e interações em um sistema de e-commerce, conforme as seguintes regras:\n§\nProdutos:\nCada produto deve ter um 'id' único e um 'nome' não vazio.\nO 'preco' de cada produto deve ser um número positivo.\nO campo 'disponivel' deve ser um booleano indicando se o produto está disponível ou não.\n\nUsuário:\nO usuário deve ter um 'nome' não vazio.\nA 'idade' do usuário deve ser um número positivo.\nO 'email' do usuário deve estar em um formato válido.\n\nConfigurações:\nO campo 'notificacoes' deve ser um booleano.\nO campo 'tema' deve ser uma string não vazia.\nO campo 'idioma' deve ser uma string não vazia.\n\nEndereço:\nO campo 'rua' deve ser uma string não vazia.\nO campo 'numero' deve ser um número positivo.\nO campo 'cidade' deve ser uma string não vazia.\nO campo 'estado' deve ser uma string de dois caracteres representando a sigla do estado.\nO campo 'cep' deve estar em um formato válido.\n\nHistórico de Pedidos:\nCada pedido deve ter um 'pedidoId' único.\nO campo 'produto' deve corresponder ao nome de um dos produtos listados.\nO campo 'quantidade' deve ser um número inteiro positivo.\nO campo 'precoTotal' deve ser um número positivo.\n\nCarrinho Atual:\nCada produto no carrinho deve ter um 'produtoId' correspondente a um dos produtos listados.\nA 'quantidade' de cada produto no carrinho deve ser um número inteiro positivo.\nO 'precoTotal' do carrinho deve ser um número positivo.\n\nMétodo de Pagamento:\nPara o método de pagamento por cartão, o 'numero' do cartão deve estar em um formato válido.\nA 'validade' do cartão deve estar em um formato válido (MM/AAAA).\nO 'cvv' do cartão deve ser um código de três ou quatro dígitos.\n\nContato:\nO campo 'telefone' deve estar em um formato válido.\nO campo 'emailSecundario', se fornecido, deve estar em um formato válido.\n\nÚltima Compra:\nA 'data' da última compra deve estar em um formato válido (AAAA-MM-DD).\nO 'valor' da última compra deve ser um número positivo.\nO campo 'produto' deve corresponder ao nome de um dos produtos listados.\n\nRecomendações:\nO campo 'preco' de cada recomendação deve ser um número positivo.\n\nEstatísticas de Uso:\nO campo 'horasConectado' deve ser um número positivo.\nO campo 'diasAtivo' deve ser um número positivo.\n\nAmigos:\nCada amigo deve ter um 'nome' não vazio.\nO campo 'contato' de cada amigo, se fornecido, deve estar em um formato válido.\n\nPreferências:\nO campo 'categoriasFavoritas' deve ser uma lista não vazia de strings.\nO campo 'notificarPromocoes' deve ser um booleano.",
        parameters: [
          {
            name: "body",
            in: "body",
            description: "JSON a ser validado",
            schema: {
              type: "object",
              properties: {
                produtos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      nome: { type: "string" },
                      preco: { type: "number" },
                      disponivel: { type: "boolean" },
                    },
                  },
                },
                usuario: {
                  type: "object",
                  properties: {
                    nome: { type: "string" },
                    idade: { type: "integer" },
                    email: { type: "string" },
                  },
                },
                configuracoes: {
                  type: "object",
                  properties: {
                    notificacoes: { type: "boolean" },
                    tema: { type: "string" },
                    idioma: { type: "string" },
                  },
                },
                endereco: {
                  type: "object",
                  properties: {
                    rua: { type: "string" },
                    numero: { type: "integer" },
                    cidade: { type: "string" },
                    estado: { type: "string" },
                    cep: { type: "string" },
                  },
                },
                historicoDePedidos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      pedidoId: { type: "integer" },
                      produto: { type: "string" },
                      quantidade: { type: "integer" },
                      precoTotal: { type: "number" },
                    },
                  },
                },
                carrinhoAtual: {
                  type: "object",
                  properties: {
                    produtos: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          produtoId: { type: "integer" },
                          quantidade: { type: "integer" },
                        },
                      },
                    },
                    precoTotal: { type: "number" },
                  },
                },
                metodoDePagamento: {
                  type: "object",
                  properties: {
                    cartao: {
                      type: "object",
                      properties: {
                        numero: { type: "string" },
                        validade: { type: "string" },
                        cvv: { type: "string" },
                      },
                    },
                  },
                },
                contato: {
                  type: "object",
                  properties: {
                    telefone: { type: "string" },
                    emailSecundario: { type: "string" },
                  },
                },
                assinaturaNewsletter: { type: "boolean" },
                ultimaCompra: {
                  type: "object",
                  properties: {
                    data: { type: "string" },
                    valor: { type: "number" },
                    produto: { type: "string" },
                  },
                },
                recomendacoes: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      produto: { type: "string" },
                      preco: { type: "number" },
                    },
                  },
                },
                perfilPublico: { type: "boolean" },
                estatisticasDeUso: {
                  type: "object",
                  properties: {
                    horasConectado: { type: "integer" },
                    diasAtivo: { type: "integer" },
                  },
                },
                amigos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      nome: { type: "string" },
                      contato: { type: "string" },
                    },
                  },
                },
                preferencias: {
                  type: "object",
                  properties: {
                    categoriasFavoritas: {
                      type: "array",
                      items: { type: "string" },
                    },
                    notificarPromocoes: { type: "boolean" },
                  },
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 1 successful",
          },
        },
      },
    },
    "/json_2": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 2 ",
        description:
          "Desafio de Validação:\n\n1. Verifique se o nome do usuário está presente e não está vazio.\n2. Certifique-se de que a idade do usuário é um número positivo.\n3. Valide os endereços de e-mail do usuário principal e secundário.\n4. Garanta que o número de telefone do usuário esteja em um formato válido.\n5. Verifique se a rua, cidade e estado do endereço estão preenchidos e não vazios.\n6. Certifique-se de que o número do endereço é um número positivo.\n7. Valide o formato do CEP.\n8. Verifique se o tema e idioma das preferências estão preenchidos e não vazios.\n9. Certifique-se de que há pelo menos uma categoria favorita nas preferências.\n10. Verifique se a opção de notificar promoções está definida como um booleano.\n11. Valide os pedidos no histórico de compras:\n    a. Garanta que cada pedido tenha um ID único.\n    b. Verifique se cada item de pedido tem um ID de produto, nome, quantidade e preço.\n    c. Certifique-se de que o total do pedido é um número positivo.\n    d. Valide o formato da data do pedido.\n12. Verifique se a assinatura da newsletter está definida como um booleano.\n13. Certifique-se de que a opção de receber SMS está definida como um booleano.\n14. Valide os métodos de pagamento:\n    a. Para o cartão de crédito, verifique se o número do cartão está em um formato válido.\n    b. Verifique se a data de validade do cartão está em um formato válido.\n    c. Certifique-se de que o CVV do cartão é um código de três ou quatro dígitos.\n    d. Para o PayPal, verifique se o e-mail está em um formato válido.\n15. Certifique-se de que as horas conectadas e os dias ativos nas estatísticas de uso são números positivos.\n16. Valide o formato da data do último login.\n17. Certifique-se de que cada amigo tenha um nome não vazio e um formato de contato válido.\n18. Verifique se cada recomendação de produto tem um ID de produto, nome e preço.\n\nSe todas essas validações forem bem-sucedidas, o JSON estará corretamente estruturado e pronto para ser processado pelo sistema de e-commerce.",
        parameters: [
          {
            name: "body",
            in: "body",
            description: "JSON a ser validado",
            schema: {
              type: "object",
              properties: {
                usuario: {
                  type: "object",
                  properties: {
                    informacoesPessoais: {
                      type: "object",
                      properties: {
                        nome: {
                          type: "string",
                        },
                        idade: {
                          type: "number",
                        },
                        contatos: {
                          type: "object",
                          properties: {
                            emailPrincipal: {
                              type: "string",
                            },
                            emailSecundario: {
                              type: "string",
                            },
                            telefone: {
                              type: "string",
                            },
                          },
                          required: [
                            "emailPrincipal",
                            "emailSecundario",
                            "telefone",
                          ],
                        },
                        endereco: {
                          type: "object",
                          properties: {
                            rua: {
                              type: "string",
                            },
                            numero: {
                              type: "number",
                            },
                            complemento: {
                              type: "string",
                            },
                            cidade: {
                              type: "string",
                            },
                            estado: {
                              type: "string",
                            },
                            cep: {
                              type: "string",
                            },
                          },
                          required: [
                            "rua",
                            "numero",
                            "complemento",
                            "cidade",
                            "estado",
                            "cep",
                          ],
                        },
                      },
                      required: ["nome", "idade", "contatos", "endereco"],
                    },
                    preferencias: {
                      type: "object",
                      properties: {
                        tema: {
                          type: "string",
                        },
                        idioma: {
                          type: "string",
                        },
                        categoriasFavoritas: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        notificarPromocoes: {
                          type: "boolean",
                        },
                      },
                      required: [
                        "tema",
                        "idioma",
                        "categoriasFavoritas",
                        "notificarPromocoes",
                      ],
                    },
                    historicoDeCompras: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          pedidoId: {
                            type: "number",
                          },
                          itens: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                produtoId: {
                                  type: "number",
                                },
                                nome: {
                                  type: "string",
                                },
                                quantidade: {
                                  type: "number",
                                },
                                preco: {
                                  type: "number",
                                },
                              },
                              required: [
                                "produtoId",
                                "nome",
                                "quantidade",
                                "preco",
                              ],
                            },
                          },
                          total: {
                            type: "number",
                          },
                          data: {
                            type: "string",
                          },
                        },
                        required: ["pedidoId", "itens", "total", "data"],
                      },
                    },
                    configuracoesDeConta: {
                      type: "object",
                      properties: {
                        assinaturaNewsletter: {
                          type: "boolean",
                        },
                        receberSMS: {
                          type: "boolean",
                        },
                        metodosDePagamento: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              tipo: {
                                type: "string",
                              },
                              detalhes: {
                                type: "object",
                                properties: {
                                  numero: {
                                    type: "string",
                                  },
                                  validade: {
                                    type: "string",
                                  },
                                  cvv: {
                                    type: "string",
                                  },
                                },
                                required: ["numero", "validade", "cvv"],
                              },
                              email: {
                                type: "string",
                              },
                            },
                            required: ["tipo"],
                          },
                        },
                      },
                      required: [
                        "assinaturaNewsletter",
                        "receberSMS",
                        "metodosDePagamento",
                      ],
                    },
                    estatisticasDeUso: {
                      type: "object",
                      properties: {
                        horasConectado: {
                          type: "number",
                        },
                        diasAtivo: {
                          type: "number",
                        },
                        logins: {
                          type: "object",
                          properties: {
                            ultimoLogin: {
                              type: "string",
                            },
                            dispositivosUsados: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  tipo: {
                                    type: "string",
                                  },
                                  modelo: {
                                    type: "string",
                                  },
                                },
                                required: ["tipo", "modelo"],
                              },
                            },
                          },
                          required: ["ultimoLogin", "dispositivosUsados"],
                        },
                      },
                      required: ["horasConectado", "diasAtivo", "logins"],
                    },
                    amigos: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          nome: {
                            type: "string",
                          },
                          contato: {
                            type: "string",
                          },
                        },
                        required: ["nome", "contato"],
                      },
                    },
                    recomendacoesDeProdutos: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          produtoId: {
                            type: "number",
                          },
                          nome: {
                            type: "string",
                          },
                          preco: {
                            type: "number",
                          },
                        },
                        required: ["produtoId", "nome", "preco"],
                      },
                    },
                  },
                  required: [
                    "informacoesPessoais",
                    "preferencias",
                    "historicoDeCompras",
                    "configuracoesDeConta",
                    "estatisticasDeUso",
                    "amigos",
                    "recomendacoesDeProdutos",
                  ],
                },
              },
              required: ["usuario"],
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 2 successful",
          },
        },
      },
    },
    "/json_3": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 3 ",
        description:
          "Validação do JSON para a 'Conferência de Tecnologia 2024'. Verifique: \n1. Estrutura: Confirmação de todas as chaves principais e sub-chaves corretas em cada seção do JSON. \n2. Conteúdo e Dados: Verificação da exatidão dos dados de local, data, organizadores, programação, participantes, feedbacks e sustentabilidade. \n3. Relações e Lógica: Confirmação de que participantes estão inscritos em sessões existentes, feedbacks associados corretamente, e avaliações dentro da escala válida. \n4. Sustentabilidade: Verificar a corretude das políticas e parceiros listados. ",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                evento: {
                  type: "object",
                  properties: {
                    nome: {
                      type: "string",
                    },
                    local: {
                      type: "object",
                      properties: {
                        nome: {
                          type: "string",
                        },
                        endereco: {
                          type: "object",
                          properties: {
                            rua: {
                              type: "string",
                            },
                            cidade: {
                              type: "string",
                            },
                            estado: {
                              type: "string",
                            },
                            cep: {
                              type: "string",
                            },
                          },
                          required: ["rua", "cidade", "estado", "cep"],
                        },
                      },
                      required: ["nome", "endereco"],
                    },
                    data: {
                      type: "string",
                    },
                    organizadores: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          nome: {
                            type: "string",
                          },
                          contato: {
                            type: "string",
                          },
                        },
                        required: ["nome", "contato"],
                      },
                    },
                    programacao: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          dia: {
                            type: "string",
                          },
                          sessoes: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                titulo: {
                                  type: "string",
                                },
                                horario: {
                                  type: "string",
                                },
                                palestrante: {
                                  type: "string",
                                },
                                sala: {
                                  type: "string",
                                },
                                descricao: {
                                  type: "string",
                                },
                              },
                              required: [
                                "titulo",
                                "horario",
                                "palestrante",
                                "sala",
                                "descricao",
                              ],
                            },
                          },
                        },
                        required: ["dia", "sessoes"],
                      },
                    },
                    participantes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          nome: {
                            type: "string",
                          },
                          email: {
                            type: "string",
                          },
                          tipo: {
                            type: "string",
                          },
                          sessoesInscritas: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                        required: ["nome", "email", "tipo", "sessoesInscritas"],
                      },
                    },
                    feedbacks: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          sessao: {
                            type: "string",
                          },
                          comentarios: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                participante: {
                                  type: "string",
                                },
                                comentario: {
                                  type: "string",
                                },
                                avaliacao: {
                                  type: "number",
                                },
                              },
                              required: [
                                "participante",
                                "comentario",
                                "avaliacao",
                              ],
                            },
                          },
                        },
                        required: ["sessao", "comentarios"],
                      },
                    },
                    sustentabilidade: {
                      type: "object",
                      properties: {
                        politicas: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        parceiros: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              nome: {
                                type: "string",
                              },
                              contato: {
                                type: "string",
                              },
                            },
                            required: ["nome", "contato"],
                          },
                        },
                      },
                      required: ["politicas", "parceiros"],
                    },
                  },
                  required: [
                    "nome",
                    "local",
                    "data",
                    "organizadores",
                    "programacao",
                    "participantes",
                    "feedbacks",
                    "sustentabilidade",
                  ],
                },
              },
              required: ["evento"],
            },
          },
        ],

        responses: {
          200: {
            description: "Challenger Automation 3 successful",
          },
        },
      },
    },
    "/json_4": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 4 ",
        description:
          "4 - Desafio de Validação Verificar a consistência das linguas e tradicionalVestimenta entre as culturas para garantir que não haja duplicatas no mesmo continente e que cada cultura esteja associada a apenas uma região.",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                linguagensDeProgramacao: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                      },
                      nome: {
                        type: "string",
                      },
                      criador: {
                        type: "object",
                        properties: {
                          nome: {
                            type: "string",
                          },
                          nacionalidade: {
                            type: "string",
                          },
                        },
                        required: ["nome", "nacionalidade"],
                      },
                      ano: {
                        type: "number",
                      },
                      paradigmas: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      aplicacoes: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      validacoesEspecificas: {
                        type: "object",
                        properties: {
                          formatoNome: {
                            type: "string",
                          },
                          anoMinimo: {
                            type: "number",
                          },
                        },
                        required: ["formatoNome", "anoMinimo"],
                      },
                    },
                    required: [
                      "id",
                      "nome",
                      "criador",
                      "ano",
                      "paradigmas",
                      "aplicacoes",
                      "validacoesEspecificas",
                    ],
                  },
                },
                etnologia: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                      },
                      continente: {
                        type: "string",
                      },
                      culturas: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "number",
                            },
                            nome: {
                              type: "string",
                            },
                            lingua: {
                              type: "string",
                            },
                            tradicionalVestimenta: {
                              type: "string",
                            },
                            rituais: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            validacoesEspecificas: {
                              type: "object",
                              properties: {
                                linguaFormato: {
                                  type: "string",
                                },
                                numeroDeRituais: {
                                  type: "object",
                                  properties: {
                                    min: {
                                      type: "number",
                                    },
                                    max: {
                                      type: "number",
                                    },
                                  },
                                  required: ["min", "max"],
                                },
                              },
                              required: ["linguaFormato", "numeroDeRituais"],
                            },
                          },
                          required: [
                            "id",
                            "nome",
                            "lingua",
                            "tradicionalVestimenta",
                            "rituais",
                            "validacoesEspecificas",
                          ],
                        },
                      },
                    },
                    required: ["id", "continente", "culturas"],
                  },
                },
                validacaoGlobal: {
                  type: "object",
                  properties: {
                    idsUnicos: {
                      type: "boolean",
                    },
                    referenciaCruzada: {
                      type: "object",
                      properties: {
                        linguagensCulturas: {
                          type: "object",
                          properties: {
                            1: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            2: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                          required: ["1", "2"],
                        },
                      },
                      required: ["linguagensCulturas"],
                    },
                  },
                  required: ["idsUnicos", "referenciaCruzada"],
                },
              },
              required: [
                "linguagensDeProgramacao",
                "etnologia",
                "validacaoGlobal",
              ],
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 4 successful",
          },
        },
      },
    },
    "/json_5": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 5 ",
        description:
          "5 - Desafio de Validação Assegurar que cada id nos projetos, equipes, e tarefas seja único dentro de toda a estrutura do JSON e que o status de cada tarefa esteja em concordância com as dependências de outras tarefas dentro da mesma equipe.",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                empresa: {
                  type: "object",
                  properties: {
                    nome: {
                      type: "string",
                    },
                    setores: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                          },
                          nome: {
                            type: "string",
                          },
                          projetos: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "number",
                                },
                                nome: {
                                  type: "string",
                                },
                                linguagensUsadas: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "number",
                                      },
                                      nome: {
                                        type: "string",
                                      },
                                      versao: {
                                        type: "string",
                                      },
                                    },
                                    required: ["id", "nome", "versao"],
                                  },
                                },
                                inicio: {
                                  type: "string",
                                },
                                prazo: {
                                  type: "string",
                                },
                                status: {
                                  type: "string",
                                },
                                equipes: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "number",
                                      },
                                      nome: {
                                        type: "string",
                                      },
                                      membros: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          properties: {
                                            id: {
                                              type: "number",
                                            },
                                            nome: {
                                              type: "string",
                                            },
                                            cargo: {
                                              type: "string",
                                            },
                                          },
                                          required: ["id", "nome", "cargo"],
                                        },
                                      },
                                      tarefas: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          properties: {
                                            id: {
                                              type: "number",
                                            },
                                            descricao: {
                                              type: "string",
                                            },
                                            status: {
                                              type: "string",
                                            },
                                          },
                                          required: [
                                            "id",
                                            "descricao",
                                            "status",
                                          ],
                                        },
                                      },
                                    },
                                    required: [
                                      "id",
                                      "nome",
                                      "membros",
                                      "tarefas",
                                    ],
                                  },
                                },
                              },
                              required: [
                                "id",
                                "nome",
                                "linguagensUsadas",
                                "inicio",
                                "prazo",
                                "status",
                                "equipes",
                              ],
                            },
                          },
                        },
                        required: ["id", "nome", "projetos"],
                      },
                    },
                  },
                  required: ["nome", "setores"],
                },
              },
              required: ["empresa"],
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 5 successful",
          },
        },
      },
    },
    "/json_6": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 6 ",
        description:
          "Validação de lógica e consistência para a 'Agência Espacial Internacional'. O desafio inclui: \n1. Consistência de Lançamentos: Verificação de que cada satélite está associado a um veículo lançador com capacidade suficiente e que veículos 'ativos' têm missões associadas. \n2. Temporalidade e Status: Garantir que todas as missões 'ativas' têm datas passadas e que itens 'em preparação' têm lançamentos futuros. \n3. Relações de Dados: Coerência entre satélites e missões quanto aos veículos usados, e uso de veículos lançadores ativos para operações planejadas. \n4. Coerência de Missão: As missões tripuladas devem ter astronautas apropriados; missões não tripuladas devem ter objetivos compatíveis.",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                agenciaEspacial: {
                  type: "string",
                },
                veiculosLancadores: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      nome: {
                        type: "string",
                      },
                      capacidadeCarga: {
                        type: "string",
                      },
                      primeiroLancamento: {
                        type: "string",
                      },
                      status: {
                        type: "string",
                      },
                    },
                    required: [
                      "id",
                      "nome",
                      "capacidadeCarga",
                      "primeiroLancamento",
                      "status",
                    ],
                  },
                },
                satelites: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      nome: {
                        type: "string",
                      },
                      tipo: {
                        type: "string",
                      },
                      veiculoLancadorId: {
                        type: "string",
                      },
                      status: {
                        type: "string",
                      },
                    },
                    required: [
                      "id",
                      "nome",
                      "tipo",
                      "veiculoLancadorId",
                      "status",
                    ],
                  },
                },
                missoes: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      nome: {
                        type: "string",
                      },
                      tipo: {
                        type: "string",
                      },
                      veiculoLancadorId: {
                        type: "string",
                      },
                      tripulacao: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            nome: {
                              type: "string",
                            },
                          },
                          required: ["id", "nome"],
                        },
                      },
                      objetivos: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      status: {
                        type: "string",
                      },
                    },
                    required: [
                      "id",
                      "nome",
                      "tipo",
                      "veiculoLancadorId",
                      "objetivos",
                      "status",
                    ],
                  },
                },
              },
              required: [
                "agenciaEspacial",
                "veiculosLancadores",
                "satelites",
                "missoes",
              ],
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 6 successful",
          },
        },
      },
    },
    "/json_7": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 7 ",
        description:
          "Consistência de Equipes: Assegurar que todas as equipes mencionadas nos jogos estejam listadas nas equipes participantes do torneio correspondente. Isso envolve verificar se as equipes de cada jogo realmente pertencem ao grupo listado para o ano correspondente. \n\n Resultados Corretos: Validar que os resultados dos jogos refletem de forma precisa os gols marcados, verificando também que não existam discrepâncias nos dados dos jogos, como uma equipe sendo listada como vencedora mas com menos gols que o adversário.\n\nCapacidade dos Estádios: Verificar que a capacidade dos estádios listada para cada Copa do Mundo seja consistente ou maior do que a capacidade registrada em Copas anteriores, assegurando uma validação temporal de dados.",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                copasDoMundo: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      ano: {
                        type: "number",
                      },
                      paisSede: {
                        type: "string",
                      },
                      estadios: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            nome: {
                              type: "string",
                            },
                            cidade: {
                              type: "string",
                            },
                            capacidade: {
                              type: "number",
                            },
                          },
                          required: ["nome", "cidade", "capacidade"],
                        },
                      },
                      equipes: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            nome: {
                              type: "string",
                            },
                            grupo: {
                              type: "string",
                            },
                          },
                          required: ["nome", "grupo"],
                        },
                      },
                      jogos: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            data: {
                              type: "string",
                            },
                            estadio: {
                              type: "string",
                            },
                            equipes: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            resultado: {
                              type: "object",
                              properties: {
                                Brasil: {
                                  type: "number",
                                },
                                Suíça: {
                                  type: "number",
                                },
                                França: {
                                  type: "number",
                                },
                                Austrália: {
                                  type: "number",
                                },
                                Alemanha: {
                                  type: "number",
                                },
                                "Coreia do Sul": {
                                  type: "number",
                                },
                                Argentina: {
                                  type: "number",
                                },
                                México: {
                                  type: "number",
                                },
                              },
                              required: [],
                            },
                          },
                          required: ["data", "estadio", "equipes", "resultado"],
                        },
                      },
                    },
                    required: [
                      "ano",
                      "paisSede",
                      "estadios",
                      "equipes",
                      "jogos",
                    ],
                  },
                },
              },
              required: ["copasDoMundo"],
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 7 successful",
          },
        },
      },
    },
    "/json_8": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 8 ",
        description:
          "Disponibilidade de Quartos: Certificar que os quartos de hotel listados nas reservas estejam disponíveis nas datas especificadas pela reserva do cliente, sem sobreposição com outras reservas.\n\nCompatibilidade de Reservas: Garantir que as datas e locais de voos, hotéis, e veículos se alinhem de forma lógica. Por exemplo, um cliente não pode reservar um voo que chega em Londres e imediatamente depois um carro em Paris sem um voo intermediário.\n\nPreço Total da Reserva: Verificar o preço total de cada reserva, incluindo todos os voos, estadias em hotéis e locações de veículos para garantir que o total cobrado está correto e que todas as taxas estão incluídas.",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                sistemaDeReservas: {
                  type: "object",
                  properties: {
                    voos: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          companhia: {
                            type: "string",
                          },
                          origem: {
                            type: "string",
                          },
                          destino: {
                            type: "string",
                          },
                          partida: {
                            type: "string",
                          },
                          chegada: {
                            type: "string",
                          },
                          preco: {
                            type: "number",
                          },
                        },
                        required: [
                          "id",
                          "companhia",
                          "origem",
                          "destino",
                          "partida",
                          "chegada",
                          "preco",
                        ],
                      },
                    },
                    hoteis: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          nome: {
                            type: "string",
                          },
                          cidade: {
                            type: "string",
                          },
                          quartosDisponiveis: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                tipo: {
                                  type: "string",
                                },
                                precoPorNoite: {
                                  type: "number",
                                },
                                capacidade: {
                                  type: "number",
                                },
                              },
                              required: ["tipo", "precoPorNoite", "capacidade"],
                            },
                          },
                        },
                        required: [
                          "id",
                          "nome",
                          "cidade",
                          "quartosDisponiveis",
                        ],
                      },
                    },
                    veiculos: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          tipo: {
                            type: "string",
                          },
                          modelo: {
                            type: "string",
                          },
                          localRetirada: {
                            type: "string",
                          },
                          precoPorDia: {
                            type: "number",
                          },
                          disponibilidade: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                        required: [
                          "id",
                          "tipo",
                          "modelo",
                          "localRetirada",
                          "precoPorDia",
                          "disponibilidade",
                        ],
                      },
                    },
                  },
                  required: ["voos", "hoteis", "veiculos"],
                },
                reservas: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      cliente: {
                        type: "string",
                      },
                      itensReservados: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            tipo: {
                              type: "string",
                            },
                            id: {
                              type: "string",
                            },
                            quarto: {
                              type: "string",
                            },
                            dias: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                          required: ["tipo", "id"],
                        },
                      },
                    },
                    required: ["cliente", "itensReservados"],
                  },
                },
              },
              required: ["sistemaDeReservas", "reservas"],
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 8 successful",
          },
        },
      },
    },
    "/json_9": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 9 ",
        description:
          "Desafio de Validação Complexo: Total de Gols: Calcule o total de gols marcados pelo Brasil ao longo dos sete jogos da Copa do Mundo.\n\n Total de Faltas: Determine o total de faltas cometidas pela equipe brasileira durante toda a competição.\n\n Total de Cartões: Conte quantos cartões amarelos e vermelhos foram recebidos pelos jogadores do Brasil durante os sete jogos.\n\nDesafio de Relatórios Detalhados: Crie uma função que processe o JSON dos jogos do Brasil na Copa do Mundo e retorne um relatório detalhado para cada jogo, incluindo: - Total de gols marcados pelo Brasil e pelos adversários. - Nomes dos jogadores que marcaram gols para o Brasil e para os adversários, juntamente com os minutos em que os gols foram marcados. - Total de faltas cometidas pelo Brasil e pelos adversários. - Nomes dos jogadores que cometeram faltas para o Brasil e para os adversários, juntamente com os minutos em que as faltas ocorreram. - Total de cartões (amarelos e vermelhos) recebidos pelo Brasil e pelos adversários. - Nomes dos jogadores que receberam cartões para o Brasil e para os adversários, juntamente com os minutos em que os cartões foram mostrados.\nDesafio de Estatísticas: - Calcule a média de gols por jogo marcados pelo Brasil e pelos adversários. - Identifique o jogo com o maior número de gols. - Determine o jogador brasileiro com mais gols ao longo da competição.",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                copaDoMundo: {
                  type: "object",
                  properties: {
                    jogosDoBrasil: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                          },
                          adversario: {
                            type: "string",
                          },
                          resultado: {
                            type: "string",
                          },
                          placar: {
                            type: "string",
                          },
                          detalhes: {
                            type: "object",
                            properties: {
                              gols: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    jogador: {
                                      type: "string",
                                    },
                                    minuto: {
                                      type: "number",
                                    },
                                  },
                                  required: ["jogador", "minuto"],
                                },
                              },
                              faltas: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    jogador: {
                                      type: "string",
                                    },
                                    minuto: {
                                      type: "number",
                                    },
                                  },
                                  required: ["jogador", "minuto"],
                                },
                              },
                              cartoes: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    jogador: {
                                      type: "string",
                                    },
                                    tipo: {
                                      type: "string",
                                    },
                                    minuto: {
                                      type: "number",
                                    },
                                  },
                                  required: ["jogador", "tipo", "minuto"],
                                },
                              },
                            },
                            required: ["gols", "faltas", "cartoes"],
                          },
                        },
                        required: [
                          "id",
                          "adversario",
                          "resultado",
                          "placar",
                          "detalhes",
                        ],
                      },
                    },
                  },
                  required: ["jogosDoBrasil"],
                },
              },
              required: ["copaDoMundo"],
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 9 successful",
          },
        },
      },
    },
    "/json_10": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 10 ",
        description: "Desafio de Validação Complexo: Encontrar todos os campos",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "array",
              items: {
                type: "object",
                properties: {
                  users: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        main: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              intro: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    title: {
                                      type: "string",
                                    },
                                    description: {
                                      type: "string",
                                    },
                                    primeira_camada: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          segunda_camada: {
                                            type: "array",
                                            items: {
                                              type: "object",
                                              properties: {
                                                title_segunda_camada: {
                                                  type: "string",
                                                },
                                                terceira_camada: {
                                                  type: "array",
                                                  items: {
                                                    type: "object",
                                                    properties: {
                                                      title_terceira_camada: {
                                                        type: "string",
                                                      },
                                                      quarta_camada: {
                                                        type: "array",
                                                        items: {
                                                          type: "object",
                                                          properties: {
                                                            title_quarta_camada:
                                                              {
                                                                type: "string",
                                                              },
                                                            objeto_quarta_camada:
                                                              {
                                                                type: "object",
                                                                properties: {
                                                                  title: {
                                                                    type: "string",
                                                                  },
                                                                  objeto_da_quarta_camada:
                                                                    {
                                                                      type: "object",
                                                                      properties:
                                                                        {
                                                                          title:
                                                                            {
                                                                              type: "string",
                                                                            },
                                                                          terceiro_objeto_da_camada:
                                                                            {
                                                                              type: "string",
                                                                            },
                                                                        },
                                                                      required:
                                                                        [
                                                                          "title",
                                                                          "terceiro_objeto_da_camada",
                                                                        ],
                                                                    },
                                                                },
                                                                required: [
                                                                  "title",
                                                                  "objeto_da_quarta_camada",
                                                                ],
                                                              },
                                                            quinta_camada: {
                                                              type: "array",
                                                              items: {
                                                                type: "object",
                                                                properties: {
                                                                  title: {
                                                                    type: "string",
                                                                  },
                                                                  intro_quinta_camada:
                                                                    {
                                                                      type: "array",
                                                                      items: {
                                                                        type: "object",
                                                                        properties:
                                                                          {
                                                                            title:
                                                                              {
                                                                                type: "string",
                                                                              },
                                                                          },
                                                                        required:
                                                                          [
                                                                            "title",
                                                                          ],
                                                                      },
                                                                    },
                                                                  sexta_camada:
                                                                    {
                                                                      type: "array",
                                                                      items: {
                                                                        type: "object",
                                                                        properties:
                                                                          {
                                                                            title:
                                                                              {
                                                                                type: "string",
                                                                              },
                                                                            intro_sexta_camada:
                                                                              {
                                                                                type: "object",
                                                                                properties:
                                                                                  {
                                                                                    array_sexta_camada:
                                                                                      {
                                                                                        type: "array",
                                                                                        items:
                                                                                          {
                                                                                            type: "object",
                                                                                            properties:
                                                                                              {
                                                                                                title:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                                objeto_sexta_camada:
                                                                                                  {
                                                                                                    type: "object",
                                                                                                    properties:
                                                                                                      {
                                                                                                        title:
                                                                                                          {
                                                                                                            type: "string",
                                                                                                          },
                                                                                                      },
                                                                                                    required:
                                                                                                      [
                                                                                                        "title",
                                                                                                      ],
                                                                                                  },
                                                                                                title_sem_objeto:
                                                                                                  {
                                                                                                    type: "string",
                                                                                                  },
                                                                                              },
                                                                                            required:
                                                                                              [],
                                                                                          },
                                                                                      },
                                                                                  },
                                                                                required:
                                                                                  [
                                                                                    "array_sexta_camada",
                                                                                  ],
                                                                              },
                                                                          },
                                                                        required:
                                                                          [],
                                                                      },
                                                                    },
                                                                },
                                                                required: [],
                                                              },
                                                            },
                                                          },
                                                          required: [],
                                                        },
                                                      },
                                                    },
                                                    required: [],
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                          },
                                        },
                                        required: ["segunda_camada"],
                                      },
                                    },
                                  },
                                  required: [],
                                },
                              },
                            },
                            required: ["intro"],
                          },
                        },
                      },
                      required: ["main"],
                    },
                  },
                },
                required: ["users"],
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 10 successful",
          },
        },
      },
    },
    "/json_11": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 11 ",
        description: "Desafio de Validação Complexo: Encontrar todos os campos",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                user_info: {
                  type: "object",
                  properties: {
                    address: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          primary_address: {
                            type: "object",
                            properties: {
                              house: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    room: {
                                      type: "object",
                                      properties: {
                                        items: {
                                          type: "object",
                                          properties: {
                                            "item-1": {
                                              type: "string",
                                            },
                                            "item-2": {
                                              type: "string",
                                            },
                                          },
                                          required: ["item-1", "item-2"],
                                        },
                                        bad: {
                                          type: "array",
                                          items: {
                                            type: "object",
                                            properties: {
                                              sanders: {
                                                type: "object",
                                                properties: {
                                                  airPlane: {
                                                    type: "array",
                                                    items: {
                                                      type: "object",
                                                      properties: {
                                                        id: {
                                                          type: "number",
                                                        },
                                                        name: {
                                                          type: "string",
                                                        },
                                                        Brooks: {
                                                          type: "array",
                                                          items: {
                                                            type: "object",
                                                            properties: {
                                                              books: {
                                                                type: "array",
                                                                items: {
                                                                  type: "object",
                                                                  properties: {
                                                                    result_final:
                                                                      {
                                                                        type: "object",
                                                                        properties:
                                                                          {
                                                                            value:
                                                                              {
                                                                                type: "string",
                                                                              },
                                                                          },
                                                                        required:
                                                                          [
                                                                            "value",
                                                                          ],
                                                                      },
                                                                  },
                                                                  required: [
                                                                    "result_final",
                                                                  ],
                                                                },
                                                              },
                                                            },
                                                            required: ["books"],
                                                          },
                                                        },
                                                      },
                                                      required: [],
                                                    },
                                                  },
                                                },
                                                required: ["airPlane"],
                                              },
                                            },
                                            required: ["sanders"],
                                          },
                                        },
                                      },
                                      required: ["items", "bad"],
                                    },
                                  },
                                  required: ["room"],
                                },
                              },
                            },
                            required: ["house"],
                          },
                        },
                        required: ["primary_address"],
                      },
                    },
                  },
                  required: ["address"],
                },
              },
              required: ["user_info"],
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 11 successful",
          },
        },
      },
    },
    "/json_12": {
      get: {
        tags: ["APIs"],
        summary: "Open challenger 12 ",
        description:
          "Imprimir de acordo com o valor quais carros cada usuário pode comprar ex: Eu sou Wood tenho 400000 e posso comprar um Dynamics Pink MAS, se ele for VIP Informe quais carro ele também tem direito. Fazer isso para Todos. Validar os endereços da Loja e o ceo.",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                produtos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                      },
                      nome: {
                        type: "string",
                      },
                      preco: {
                        type: "number",
                      },
                      disponivel: {
                        type: "boolean",
                      },
                    },
                    required: ["id", "nome", "preco", "disponivel"],
                  },
                },
                usuario: {
                  type: "object",
                  properties: {
                    nome: {
                      type: "string",
                    },
                    idade: {
                      type: "number",
                    },
                    email: {
                      type: "string",
                    },
                  },
                  required: ["nome", "idade", "email"],
                },
                configuracoes: {
                  type: "object",
                  properties: {
                    notificacoes: {
                      type: "boolean",
                    },
                    tema: {
                      type: "string",
                    },
                    idioma: {
                      type: "string",
                    },
                  },
                  required: ["notificacoes", "tema", "idioma"],
                },
                endereco: {
                  type: "object",
                  properties: {
                    rua: {
                      type: "string",
                    },
                    numero: {
                      type: "number",
                    },
                    cidade: {
                      type: "string",
                    },
                    estado: {
                      type: "string",
                    },
                    cep: {
                      type: "string",
                    },
                  },
                  required: ["rua", "numero", "cidade", "estado", "cep"],
                },
                historicoDePedidos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      pedidoId: {
                        type: "number",
                      },
                      produto: {
                        type: "string",
                      },
                      quantidade: {
                        type: "number",
                      },
                      precoTotal: {
                        type: "number",
                      },
                    },
                    required: [
                      "pedidoId",
                      "produto",
                      "quantidade",
                      "precoTotal",
                    ],
                  },
                },
                carrinhoAtual: {
                  type: "object",
                  properties: {
                    produtos: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          produtoId: {
                            type: "number",
                          },
                          quantidade: {
                            type: "number",
                          },
                        },
                        required: ["produtoId", "quantidade"],
                      },
                    },
                    precoTotal: {
                      type: "number",
                    },
                  },
                  required: ["produtos", "precoTotal"],
                },
                metodoDePagamento: {
                  type: "object",
                  properties: {
                    cartao: {
                      type: "object",
                      properties: {
                        numero: {
                          type: "string",
                        },
                        validade: {
                          type: "string",
                        },
                        cvv: {
                          type: "string",
                        },
                      },
                      required: ["numero", "validade", "cvv"],
                    },
                  },
                  required: ["cartao"],
                },
                contato: {
                  type: "object",
                  properties: {
                    telefone: {
                      type: "string",
                    },
                    emailSecundario: {
                      type: "string",
                    },
                  },
                  required: ["telefone", "emailSecundario"],
                },
                assinaturaNewsletter: {
                  type: "boolean",
                },
                ultimaCompra: {
                  type: "object",
                  properties: {
                    data: {
                      type: "string",
                    },
                    valor: {
                      type: "number",
                    },
                    produto: {
                      type: "string",
                    },
                  },
                  required: ["data", "valor", "produto"],
                },
                recomendacoes: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      produto: {
                        type: "string",
                      },
                      preco: {
                        type: "number",
                      },
                    },
                    required: ["produto", "preco"],
                  },
                },
                perfilPublico: {
                  type: "boolean",
                },
                estatisticasDeUso: {
                  type: "object",
                  properties: {
                    horasConectado: {
                      type: "number",
                    },
                    diasAtivo: {
                      type: "number",
                    },
                  },
                  required: ["horasConectado", "diasAtivo"],
                },
                amigos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      nome: {
                        type: "string",
                      },
                      contato: {
                        type: "string",
                      },
                    },
                    required: ["nome", "contato"],
                  },
                },
                preferencias: {
                  type: "object",
                  properties: {
                    categoriasFavoritas: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    notificarPromocoes: {
                      type: "boolean",
                    },
                  },
                  required: ["categoriasFavoritas", "notificarPromocoes"],
                },
              },
              required: [
                "produtos",
                "usuario",
                "configuracoes",
                "endereco",
                "historicoDePedidos",
                "carrinhoAtual",
                "metodoDePagamento",
                "contato",
                "assinaturaNewsletter",
                "ultimaCompra",
                "recomendacoes",
                "perfilPublico",
                "estatisticasDeUso",
                "amigos",
                "preferencias",
              ],
            },
          },
        ],
        responses: {
          200: {
            description: "Challenger Automation 12 successful",
          },
        },
      },
    },
    "/validate-json_9": {
      post: {
        tags: ["APIs"],
        summary: "Open challenger 9 validate ",
        description:
          "Desafio de Validação envie os dados extraídos do json_9 para validação de extração e resultado.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  jogos: {
                    type: "array",
                    description: "Array of game statistics to validate.",
                    items: {
                      type: "object",
                      required: [
                        "jogoId",
                        "totalGols",
                        "totalFaltas",
                        "totalCartoes",
                      ],
                      properties: {
                        jogoId: {
                          type: "integer",
                          description: "The unique identifier for each game.",
                          example: 1,
                        },
                        totalGols: {
                          type: "integer",
                          description:
                            "The total number of goals predicted for the game.",
                          example: 3,
                        },
                        totalFaltas: {
                          type: "integer",
                          description:
                            "The total number of fouls predicted for the game.",
                          example: 5,
                        },
                        totalCartoes: {
                          type: "integer",
                          description:
                            "The total number of cards predicted for the game.",
                          example: 2,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Challenger Automation 9 successful validate",
          },
        },
      },
    },
    "/all-jsons-data": {
      post: {
        tags: ["APIs"],
        summary: "Valida os dados de entrada",
        description:
          "Verifica se os dados enviados correspondem aos conjuntos de dados válidos e pré-definidos. Extrair e enviar via post um dado pedido de cada JSON anterior. json_1, json_2 ...",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  produtoId: {
                    type: "integer",
                    description:
                      "ID do produto, deve corresponder a um ID válido existente.",
                  },
                  usuarioEmail: {
                    type: "string",
                    format: "email",
                    description:
                      "Email do usuário, deve corresponder a um email válido existente.",
                  },
                  eventoNome: {
                    type: "string",
                    description:
                      "Nome do evento, deve corresponder a um nome de evento válido existente.",
                  },
                  linguagemNome: {
                    type: "string",
                    description:
                      "Nome da linguagem de programação, deve corresponder a uma linguagem válida existente.",
                  },
                  empresaProjetoId: {
                    type: "integer",
                    description:
                      "ID do projeto da empresa, deve corresponder a um ID de projeto válido existente.",
                  },
                  agenciaVeiculoId: {
                    type: "string",
                    description:
                      "ID do veículo lançador, deve corresponder a um ID válido existente.",
                  },
                  copaAno: {
                    type: "integer",
                    description:
                      "Ano da Copa do Mundo, deve corresponder a um ano válido existente.",
                  },
                  vooId: {
                    type: "string",
                    description:
                      "ID do voo, deve corresponder a um ID de voo válido existente.",
                  },
                  jogoId: {
                    type: "integer",
                    description:
                      "ID do jogo do Brasil, deve corresponder a um ID de jogo válido existente.",
                  },
                  required: [
                    "produtoId",
                    "usuarioEmail",
                    "eventoNome",
                    "linguagemNome",
                    "empresaProjetoId",
                    "agenciaVeiculoId",
                    "copaAno",
                    "vooId",
                    "jogoId",
                  ],
                },
              },
            },
          },
          responses: {
            200: {
              description:
                "Validação bem-sucedida, todos os dados estão corretos.",
              content: {
                "text/plain": {
                  schema: {
                    type: "string",
                    example:
                      "Todos os dados informados são válidos e foram verificados com sucesso.",
                  },
                },
              },
            },
            400: {
              description: "Erro de validação",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        description:
                          "Mensagem detalhada sobre o erro de validação.",
                      },
                    },
                    example: {
                      message:
                        "Erro de validação: produtoId must be one of [1, 2, 3]",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/infinity-array": {
      get: {
        tags: ["APIs"],
        summary: "JSON 10 camadas de aray",
        description: "JSON para treino de validação",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                layers: {
                  type: "array",
                  items: {
                    type: "array",
                    items: {
                      type: "array",
                      items: {
                        type: "array",
                        items: {
                          type: "array",
                          items: {
                            type: "array",
                            items: {
                              type: "array",
                              items: {
                                type: "array",
                                items: {
                                  type: "array",
                                  items: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        success: {
                                          type: "string",
                                        },
                                      },
                                      required: ["success"],
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              required: ["layers"],
            },
          },
        ],
        responses: {
          200: {
            description: "success",
          },
        },
      },
    },
    "/deep-validation": {
      get: {
        tags: ["APIs"],
        summary: "JSON com profundidade de validações",
        description: "JSON para treino de validação",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              $schema: "http://json-schema.org/draft-07/schema#",
              title: "Generated schema for Root",
              type: "object",
              properties: {
                empresa: {
                  type: "object",
                  properties: {
                    departamentos: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          nome: {
                            type: "string",
                          },
                          funcionarios: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                nome: {
                                  type: "string",
                                },
                                cargo: {
                                  type: "string",
                                },
                                projetos: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      nome: {
                                        type: "string",
                                      },
                                      responsavel: {
                                        type: "object",
                                        properties: {
                                          nome: {
                                            type: "string",
                                          },
                                          cargo: {
                                            type: "string",
                                          },
                                        },
                                        required: ["nome", "cargo"],
                                      },
                                      tarefas: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          properties: {
                                            descricao: {
                                              type: "string",
                                            },
                                            responsavel: {
                                              type: "object",
                                              properties: {
                                                nome: {
                                                  type: "string",
                                                },
                                                cargo: {
                                                  type: "string",
                                                },
                                              },
                                              required: ["nome", "cargo"],
                                            },
                                          },
                                          required: [
                                            "descricao",
                                            "responsavel",
                                          ],
                                        },
                                      },
                                    },
                                    required: [
                                      "nome",
                                      "responsavel",
                                      "tarefas",
                                    ],
                                  },
                                },
                              },
                              required: ["nome", "cargo", "projetos"],
                            },
                          },
                        },
                        required: ["nome", "funcionarios"],
                      },
                    },
                  },
                  required: ["departamentos"],
                },
              },
              required: ["empresa"],
            },
          },
        ],
        responses: {
          200: {
            description: "success",
          },
        },
      },
    },
    "/germany-apy": {
      get: {
        tags: ["Others"],
        summary: "JSON com profundidade de validações",
        description: "JSON para treino de validação",
        responses: {
          200: {
            description: "success",
          },
        },
      },
    },
  },
};
import express from "express";
import swaggerUi from "swagger-ui-express";
const app = express();
import bodyParser from "body-parser";
import Joi from "joi";
import jwt from "jsonwebtoken";
import germany_json from './swagger_jsons.js'
const port = 3000;
app.use(bodyParser.json());
app.use(express.static("public"));
const users = [
  { id: 1, username: "admin", password: "password" }, // Usuário exemplo
];
const secretKey = "your_secret_key"; // Mantenha esta chave segura

// Função para gerar token JWT
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// Rota de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simulação de validação de usuário
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = `Bearer ${generateToken(user)}`;
    res.status(201).json({ token });
  } else {
    res.status(401).send({ error: "Credenciais inválidas" });
  }
});
app.post("/login_hard", (req, res) => {
  const { username, password } = req.body;

  // Simulação de validação de usuário
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = `Bearer ${generateToken(user)}`;
    const _token = {
      data: [
        {
          form: [
            {
              cam: [
                {
                  in: [
                    {
                      gen: [
                        {
                          form_token: [
                            {
                              in_token: [
                                {
                                  gen_token: [
                                    {
                                      refresh: [
                                        {
                                          bearer: [
                                            {
                                              refresh_token: [
                                                {
                                                  show: {
                                                    token: token,
                                                    message:
                                                      "Achou que seria fácil né chegar no token ..hahaha",
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
          ],
        },
      ],
    };
    res.status(201).json(_token);
  } else {
    res.status(401).send({ error: "Credenciais inválidas" });
  }
});

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

const json_9 = {
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
const json_10 = {
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
const json_11 = {
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
const json_12 = [
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
const json_13 = {
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
const json_14 = {
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
//

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
app.get("/json_10", (req, res) => {
  res.send(json_12);
});
app.get("/json_11", (req, res) => {
  res.send(json_13);
});
app.get("/json_12", (req, res) => {
  res.send(json_14);
});
app.post("/validate-json_9", (req, res) => {
  const jogos = req.body.jogos;
  let resultados = [];

  jogos.forEach(({ jogoId, totalGols, totalFaltas, totalCartoes }) => {
    const jogo = json_9.copaDoMundo.jogosDoBrasil.find((j) => j.id === jogoId);
    if (!jogo) {
      resultados.push({ jogoId, error: "Jogo não encontrado" });
      return;
    }

    const golsReais = jogo.detalhes.gols.length;
    const faltasReais = jogo.detalhes.faltas.length;
    const cartoesReais = jogo.detalhes.cartoes.length;

    let erroDetalhes = {};
    let hasError = false;

    if (totalGols !== golsReais) {
      erroDetalhes.gols = `Esperado: ${golsReais}, Recebido: ${totalGols}`;
      hasError = true;
    }
    if (totalFaltas !== faltasReais) {
      erroDetalhes.faltas = `Esperado: ${faltasReais}, Recebido: ${totalFaltas}`;
      hasError = true;
    }
    if (totalCartoes !== cartoesReais) {
      erroDetalhes.cartoes = `Esperado: ${cartoesReais}, Recebido: ${totalCartoes}`;
      hasError = true;
    }

    resultados.push({
      jogoId,
      sucesso: !hasError,
      mensagem: hasError
        ? "Algumas estatísticas estão incorretas."
        : "Todas as estatísticas estão corretas!",
      erroDetalhes: hasError ? erroDetalhes : {},
    });
  });

  res.status(201).send(resultados);
});

const dados = {
  produtos: [{ id: 1 }, { id: 2 }, { id: 3 }],
  usuarios: ["joaosilva@example.com", "joao.silva@outlook.com"],
  eventos: ["Conferência de Tecnologia 2024"],
  linguagens: ["Python", "JavaScript"],
  projetos: [101, 102],
  veiculosLancadores: ["VL01", "VL02"],
  copasDoMundo: [2018, 2022],
  voos: ["V001", "V002"],
  jogosDoBrasil: [1, 2, 3, 4, 5, 6],
};

const schema = Joi.object({
  produtoId: Joi.number()
    .valid(...dados.produtos.map((p) => p.id))
    .required(),
  usuarioEmail: Joi.string()
    .email()
    .valid(...dados.usuarios)
    .required(),
  eventoNome: Joi.string()
    .valid(...dados.eventos)
    .required(),
  linguagemNome: Joi.string()
    .valid(...dados.linguagens)
    .required(),
  empresaProjetoId: Joi.number()
    .valid(...dados.projetos)
    .required(),
  agenciaVeiculoId: Joi.string()
    .valid(...dados.veiculosLancadores)
    .required(),
  copaAno: Joi.number()
    .valid(...dados.copasDoMundo)
    .required(),
  vooId: Joi.string()
    .valid(...dados.voos)
    .required(),
  jogoId: Joi.number()
    .valid(...dados.jogosDoBrasil)
    .required(),
});

app.post("/all-jsons-data", (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .send(`Erro de validação: ${error.details[0].message}`);
  }

  res.send({
    json: req.body,
    message:
      "Todos os dados informados são válidos e foram verificados com sucesso.",
  });
});
app.get("/infinity-array", (req, res) => {
  res.send(json_10);
});
app.get("/deep-validation", (req, res) => {
  res.send(json_11);
});
// Others
app.get("/germany_api", (req, res) => {
  res.send(germany_json);
});

app.get("/", (req, res) => {
  res.send("API OK");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {});
