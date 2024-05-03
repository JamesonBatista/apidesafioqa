import swaggerDocument from "./swaggerConfig.js";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { body, validationResult } from "express-validator";
import isValidCPF from "./functions.js";
import enviarEmail from "./email.js";
const app = express();
import bodyParser from "body-parser";
import Joi from "joi";
import jwt from "jsonwebtoken";
import germany_json from "./swagger_jsons.js";
import {
  json_1,
  json_2,
  json_3,
  json_4,
  json_5,
  json_6,
  json_7,
  json_8,
  json_9,
  json_10,
  json_11,
  json_12,
  json_13,
  json_14,
  independent,
  brasil,
  big_json,
  crud_get,
  loja,
  usuarios,
  produtosDeLuxo,
} from "./swagger_jsons.js";
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
app.post("/login-hard", (req, res) => {
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
app.get("/germany-api", (req, res) => {
  res.send(germany_json);
});
app.get("/independent", (req, res) => {
  res.send(independent);
});
app.get("/brasil", (req, res) => {
  res.send(brasil);
});
app.get("/big-json", (req, res) => {
  res.send(big_json);
});
// CRUD
app.get("/crud-get", (req, res) => {
  res.send(crud_get);
});
function generateId(param) {
  let newId =
    param.length > 0 ? Math.max(...param.map((user) => user.id)) + 1 : 1;

  while (param.some((user) => user.id === newId)) {
    newId++;
  }

  return newId;
}
app.post(
  "/crud-post",
  [
    body("nome")
      .notEmpty()
      .withMessage("O campo nome é obrigatório")
      .custom((value) => {
        const userExists = crud_get.users.some((user) => user.nome === value);
        if (userExists) {
          throw new Error("Nome já existe");
        }
        return true;
      }),
    body("email")
      .isEmail()
      .withMessage("Deve ser um email válido")
      .notEmpty()
      .withMessage("O campo email é obrigatório"),
    body("idade")
      .isInt({ min: 1 })
      .withMessage("A idade deve ser um número inteiro válido")
      .notEmpty()
      .withMessage("O campo idade é obrigatório"),
    body("telefone").notEmpty().withMessage("O campo telefone é obrigatório"),
    body("endereco").notEmpty().withMessage("O campo endereço é obrigatório"),
    body("profissao").notEmpty().withMessage("O campo profissão é obrigatório"),
    body("empresa").notEmpty().withMessage("O campo empresa é obrigatório"),
    body("status").notEmpty().withMessage("O campo status é obrigatório"),
    body("dataCadastro")
      .notEmpty()
      .withMessage("O campo dataCadastro é obrigatório no formato AAAA-MM-DD"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = {
      id: generateId(crud_get.users),
      nome: req.body.nome,
      email: req.body.email,
      idade: req.body.idade,
      telefone: req.body.telefone,
      endereço: req.body.endereco,
      profissão: req.body.profissao,
      empresa: req.body.empresa,
      status: req.body.status,
      dataCadastro: req.body.dataCadastro,
    };

    // Adiciona o novo usuário ao array
    crud_get.users.push(newUser);

    // Verifica se o array atingiu 50 usuários e remove os 10 primeiros se necessário
    if (crud_get.users.length > 50) {
      crud_get.users.splice(0, 10); // Remove os 10 primeiros
    }

    res.status(201).json(crud_get.users);
  }
);
app.get("/crud-id/:id", (req, res) => {
  const id = parseInt(req.params.id); // Converte o id de string para inteiro
  const user = crud_get.users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).send({ message: "Usuário não encontrado" });
  }

  res.status(200).json(user);
});
app.delete("/crud-delete/:id", (req, res) => {
  const id = parseInt(req.params.id); // Converte o id de string para inteiro
  const originalLength = crud_get.users.length;
  crud_get.users = crud_get.users.filter((user) => user.id !== id);

  if (crud_get.users.length === originalLength) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  res.status(200).json(crud_get.users);
});

app.get("/produtos", (req, res) => {
  res.send(loja);
});
app.get("/produtos/:id", (req, res) => {
  const id = req.params.id;
  const produto = loja.produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).send({ message: "Produto não encontrado" });
  }

  res.status(200).json(produto);
});

app.post(
  "/comprar-produto",
  [
    body("nome").notEmpty().withMessage("O campo nome é obrigatório"),
    body("cpf")
      .notEmpty()
      .withMessage("O campo CPF é obrigatório")
      .custom((value) => {
        if (!isValidCPF(value)) {
          throw new Error("CPF inválido");
        }
        return true;
      }),
    body("id_produto")
      .notEmpty()
      .withMessage("O campo id do produto é obrigatório"),
    body("valor_na_carteira")
      .notEmpty()
      .withMessage("O campo valor na carteira é obrigatório")
      .isFloat({ min: 0 })
      .withMessage("O valor na carteira deve ser um número válido"),
    body("receber_email")
      .optional()
      .isString()
      .withMessage("O campo receber_email deve ser booleano"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, cpf, id_produto, valor_na_carteira, receber_email } =
      req.body;
    const produto = loja.produtos.find((p) => p.id === id_produto);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    if (valor_na_carteira < produto.preco) {
      const diferenca = produto.preco - valor_na_carteira;
      return res.status(400).json({
        message: "O valor na carteira é insuficiente, preciaria de: R$",
        diferenca,
        valor_produto: produto.preco,
      });
    }

    if (receber_email) {
      let html = `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmação de Compra</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              color: #333;
          }
          .container {
              padding: 20px;
              background-color: #f4f4f4;
              border: 1px solid #ddd;
              margin: 20px auto;
              width: 80%;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
              background-color: #007bff;
              color: white;
              padding: 10px;
              text-align: center;
          }
          .content {
              padding: 20px;
              background-color: white;
          }
          .footer {
              text-align: center;
              padding: 10px;
              font-size: 0.8em;
              background-color: #eee;
          }
      </style>
      </head>
      <body>
      <div class="container">
          <div class="header">
              <h1>Parabéns pela sua compra!</h1>
          </div>
          <div class="content">
              <h2>Detalhes do Produto</h2>
              <p><strong>Produto:</strong> ${produto.nome}</p>
              <p><strong>Marca:</strong>${produto.marca}</p>
              <p><strong>Preço:</strong> R$${produto.preco}</p>
          </div>
          <div class="footer">
              Obrigado por comprar conosco!.
          </div>
      </div>
      </body>
      </html>
       `;
      enviarEmail(
        receber_email,
        `Parabéns senhor(a): ${nome || "Cliente"} pela compra do produto ${
          produto.nome
        }`,
        html
      );
      console.log("Usuário optou por receber emails.");
    }

    res.status(201).send({
      produto: produto,
      message: "Parabéns pela compra! Você adquiriu o " + produto.nome,
    });
  }
);

// BANK
app.get("/lista-clientes", (req, res) => {
  res.send(usuarios);
});

app.post(
  "/clientes",
  [
    body("nome").notEmpty().withMessage("O campo nome é obrigatório"),
    body("cpf").notEmpty().withMessage("O campo CPF é obrigatório"),
    body("contato.email")
      .isEmail()
      .withMessage("O campo email deve ser um email válido"),
    body("contato.telefone")
      .notEmpty()
      .withMessage("O campo telefone é obrigatório"),
    body("contato.endereco")
      .notEmpty()
      .withMessage("O campo endereço é obrigatório"),
    body("bank.credito")
      .notEmpty()
      .withMessage("O campo de crédito é obrigatório"),
    body("bank.debito")
      .notEmpty()
      .withMessage("O campo de débito é obrigatório"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { nome, cpf, contato, bank } = req.body;
    const novoCliente = {
      id: generateId(usuarios),
      nome,
      cpf,
      contato,
      bank,
    };
    if (usuarios.length >= 50) {
      usuarios = usuarios.slice(10);
    }

    usuarios.push(novoCliente);
    res.status(201).json(novoCliente);
  }
);
app.post("/emprestimo", (req, res) => {
  const { id_cliente, valor_emprestimo } = req.body;

  const cliente = usuarios.find((user) => user.id === id_cliente);

  if (!cliente) {
    return res.status(404).json({ error: "Cliente não encontrado" });
  }
  if (!isValidCPF(cliente.cpf)) {
    return res.status(400).json({ error: "CPF inválido" });
  }
  if (valor_emprestimo <= 0) {
    return res.status(400).json({ error: "Valor de empréstimo inválido" });
  }
  if (valor_emprestimo < cliente.bank.debito) {
    return res
      .status(400)
      .json({ error: "Valor de empréstimo menor que débito disponível" });
  }
  cliente.bank.credito = valor_emprestimo;
  cliente.emprestimo = true;
  const clienteAtualizado = { ...cliente };

  const index = usuarios.findIndex((user) => user.id === id_cliente);
  usuarios[index] = clienteAtualizado;

  res.status(201).json(clienteAtualizado);
});
app.get("/financiamento-produtos", (req, res) => {
  res.send(produtosDeLuxo.produtosDeLuxo);
});
app.post(
  "/contratar-financiamento",
  [
    body("id_cliente")
      .notEmpty()
      .withMessage("O campo id_cliente é obrigatório"),
    body("id_produto")
      .notEmpty()
      .withMessage("O campo id_produto é obrigatório"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id_cliente, id_produto } = req.body;

    // Verificar se o cliente existe
    const cliente = usuarios.find((user) => user.id === id_cliente);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    // Verificar se o produto existe
    const produto = produtosDeLuxo.produtosDeLuxo.find(
      (produto) => produto.id === id_produto
    );
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    // Verificar se o cliente possui o campo emprestimo
    if (!cliente.emprestimo) {
      return res
        .status(400)
        .json({ message: "Cliente não passou pelo endpoint /emprestimo." });
    }

    // Verificar se o cliente tem crédito suficiente
    if (cliente.bank.credito < produto.preco) {
      const diferenca = produto.preco - cliente.bank.credito;
      return res
        .status(400)
        .json({ message: "Crédito insuficiente.", diferenca });
    }

    // Atualizar o crédito do cliente
    cliente.bank.credito -= produto.preco;

    // Retornar mensagem de sucesso
    const mensagem = `Financiamento do produto ${produto.nome} (${produto.marca}, ${produto.tipo}) aprovado para o cliente ${cliente.nome}.`;
    res.status(200).json({ message: mensagem , produto: produto, valor_credito_atual: cliente.bank.credito});
  }
);

app.get("/", (req, res) => {
  res.send("API OK");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {});
