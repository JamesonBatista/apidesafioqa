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
    "/germany-api": {
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

export default swaggerDocument;
