import swaggerDocument from "./swaggerConfig.js";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { param, body, validationResult } from "express-validator";
import isValidCPF, { decrypt, encrypt } from "./functions.js";

import enviarEmail from "./email.js";
const app = express();
import bodyParser from "body-parser";
import Joi from "joi";
import jwt from "jsonwebtoken";
import germany_json, {
  company,
  eventos,
  productsGamers,
} from "./swagger_jsons.js";
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
  projects,
  membersProjet,
  clients,
  encryptedDataUser,
  mercado,
} from "./swagger_jsons.js";
app.use(bodyParser.json());
app.use(express.static("public"));
const users = [
  { id: 1, username: "admin", password: "password" }, // Usuário exemplo
];
const secretKey = "your_secret_key"; // Mantenha esta chave segura
let code_emprestimo_bank = null;
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
app.post(
  "/validate-json_9",
  [
    body("jogoId")
      .notEmpty()
      .withMessage(
        "O campo jogoId é obrigatório e deverá ser buscado no /json_9"
      ),
    body("totalGols")
      .notEmpty()
      .withMessage(
        "O campo totalGols é obrigatório e deverá ser buscado no /json_9"
      ),
    body("totalFaltas")
      .notEmpty()
      .withMessage(
        "O campo totalFaltas é obrigatório e deverá ser buscado no /json_9"
      ),
    body("totalCartoes")
      .notEmpty()
      .withMessage(
        "O campo totalCartoes é obrigatório e deverá ser buscado no /json_9"
      ),
  ],
  (req, res) => {
    const jogos = req.body.jogos;
    let resultados = [];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    jogos.forEach(({ jogoId, totalGols, totalFaltas, totalCartoes }) => {
      const jogo = json_9.copaDoMundo.jogosDoBrasil.find(
        (j) => j.id === jogoId
      );
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
  }
);

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
      .send({ errors: `Erro de validação: ${error.details[0].message}` });
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
app.get("/crud", (req, res) => {
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
  "/crud",
  [
    body("nome")
      .notEmpty()
      .withMessage("O campo nome é obrigatório")
      .custom((value) => {
        const userExists = crud_get.users.some(
          (user) => user.nome.trim() === value.trim()
        );
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
      .isInt({ min: 18 })
      .withMessage("A idade deve ser um número inteiro válido")
      .notEmpty()
      .withMessage("O campo idade é obrigatório"),
    body("telefone").notEmpty().withMessage("O campo telefone é obrigatório"),
    body("endereco").notEmpty().withMessage("O campo endereço é obrigatório"),
    body("profissao").notEmpty().withMessage("O campo profissão é obrigatório"),
    body("empresa").notEmpty().withMessage("O campo empresa é obrigatório"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Atribuição automática de 'status' como 'ativo' e 'dataCadastro' para a data atual
    const newUser = {
      id: generateId(crud_get.users),
      nome: req.body.nome,
      email: req.body.email,
      idade: req.body.idade,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      profissao: req.body.profissao,
      empresa: req.body.empresa,
      status: "ativo", // Status definido automaticamente como 'ativo'
      dataCadastro: new Date().toISOString().split("T")[0], // Data de cadastro definida como a data atual
    };

    // Adiciona o novo usuário ao array
    crud_get.users.push(newUser);

    // Verifica se o array atingiu 50 usuários e remove os 10 primeiros se necessário
    if (crud_get.users.length > 50) {
      crud_get.users.splice(0, 10); // Remove os 10 primeiros
    }

    res.status(201).json(newUser);
  }
);

app.get("/crud/:id", (req, res) => {
  const id = parseInt(req.params.id); // Converte o id de string para inteiro
  const user = crud_get.users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).send({ message: "Usuário não encontrado" });
  }

  res.status(200).json(user);
});
app.delete("/crud/:id", (req, res) => {
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
  "/produtos",
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
      .withMessage("O campo receber_email deve ser string"),
    body("send_email")
      .optional()
      .isString()
      .withMessage("O campo send_email deve ser string"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      nome,
      cpf,
      id_produto,
      valor_na_carteira,
      receber_email,
      send_email,
    } = req.body;
    const produto = loja.produtos.find((p) => p.id === id_produto);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    if (valor_na_carteira < produto.preco) {
      const diferenca = produto.preco - valor_na_carteira;
      return res.status(400).json({
        message: "O valor na carteira é insuficiente, preciaria de: ",
        diferenca,
        valor_produto: produto.preco,
      });
    }

    if (receber_email || send_email) {
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
        receber_email || send_email,
        `Parabéns senhor(a): ${nome || "Cliente"} pela compra do produto ${
          produto.nome
        }`,
        html
      );
    }

    res.status(201).send({
      produto: produto,
      message: `${nome}, Parabéns pela compra! Você comprou ${
        produto.nome
      }, Seu valor na cateira é de:  ${valor_na_carteira - produto.preco}`,
    });
  }
);

// BANK
function generateCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}
app.get("/clientes", (req, res) => {
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
      usuarios = usuarios.splice(10);
    }

    usuarios.push(novoCliente);
    res.status(201).json(novoCliente);
  }
);
app.post("/emprestimo", (req, res) => {
  code_emprestimo_bank = generateCode();
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
    return res.status(400).json({
      error: "Valor de empréstimo menor que débito disponível",
      debit_value: cliente.bank.debito,
      loan: valor_emprestimo,
    });
  }
  cliente.bank.credito = valor_emprestimo;
  const clienteAtualizado = { ...cliente, emprestimo: code_emprestimo_bank };

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
    body("code_emprestimo")
      .notEmpty()
      .withMessage("O campo code_emprestimo é obrigatório")
      .isString()
      .withMessage("O campo code_emprestimo é uma string"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      id_cliente,
      id_produto,
      code_emprestimo,
      receber_email,
      send_email,
    } = req.body;

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
    if (code_emprestimo !== code_emprestimo_bank) {
      return res
        .status(400)
        .json({ message: "Cliente não passou pelo endpoint /emprestimo." });
    }

    // Verificar se o cliente tem crédito suficiente
    if (cliente.bank.credito < produto.preco) {
      const diferenca = produto.preco - cliente.bank.credito;
      return res.status(400).json({
        message: "Crédito insuficiente.",
        actual_credit: diferenca,
      });
    }

    // Atualizar o crédito do cliente
    cliente.bank.credito -= produto.preco;

    if (receber_email || send_email) {
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
        receber_email || send_email,
        `Parabéns pela compra do produto ${produto.nome}`,
        html
      );
    }
    // Retornar mensagem de sucesso
    const mensagem = `Financiamento do produto ${produto.nome} (${produto.marca}, ${produto.tipo}) aprovado para o cliente ${cliente.nome}.`;
    res.status(200).json({
      message: mensagem,
      produto: produto,
      valor_credito_atual: cliente.bank.credito,
    });
  }
);
// PROJECT
app.get("/projects", (req, res) => {
  res.send(projects);
});
app.post(
  "/projects",
  [
    body("name")
      .notEmpty()
      .withMessage("O nome é obrigatório")
      .isString()
      .withMessage("O campo name deve ser uma string"),
    body("leader")
      .notEmpty()
      .withMessage("Campo líder é obrigatório")
      .isString()
      .withMessage("O campo leader deve ser uma string"),
    body("description")
      .notEmpty()
      .withMessage("A descrição é obrigatória")
      .isString()
      .withMessage("O campo description deve ser uma string"),
    body("endDate")
      .isISO8601()
      .withMessage("Data de término inválida")
      .custom((value) => {
        const endDate = new Date(value);
        const today = new Date();
        if (endDate <= today) {
          throw new Error("A data de término deve ser maior que a data atual");
        }
        return true;
      }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, endDate, leader } = req.body;

    const projectExists = projects.some(
      (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (projectExists) {
      return res
        .status(400)
        .json({ message: `Já existe um projeto com o nome ${name}` });
    }

    const startDate = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
    const newProject = {
      id: generateId(projects),
      name,
      leader,
      description,
      startDate,
      endDate,
      members: [],
    };

    // Limite e remoção de projetos antigos
    if (projects.length >= 50) {
      projects.splice(0, 10); // Remove os 10 primeiros
    }

    projects.push(newProject);
    res.status(201).json({
      message: "Projeto criado com sucesso!",
      project: newProject,
    });
  }
);

app.get("/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return res.status(404).json({ message: "Projeto não encontrado" });
  }
  res.status(200).json(project);
});
app.put("/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id);
  const { name, description, startDate, endDate, members } = req.body;

  // Encontrar o projeto pelo ID
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return res.status(404).json({ message: "Projeto não encontrado" });
  }

  // Atualizar os detalhes do projeto
  if (name) project.name = name;
  if (description) project.description = description;
  if (startDate) project.startDate = startDate;
  if (endDate) project.endDate = endDate;
  if (members) project.members = members;

  // Responder com o projeto atualizado
  res.status(200).json({
    message: "Projeto atualizado com sucesso",
    project,
  });
});
app.get("/projects/:id/members", (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return res
      .status(404)
      .json({ message: `Projeto com id ${projectId} não encontrado.` });
  }
  res.status(200).json(project.members);
});
app.delete("/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id);
  const projectIndex = projects.findIndex((p) => p.id === projectId);
  const project = projects.find((p) => p.id === projectId);

  if (projectIndex === -1) {
    return res.status(404).json({ message: "Projeto não encontrado" });
  }

  // Remove o projeto da lista
  projects.splice(projectIndex, 1);
  res
    .status(200)
    .json({ message: `Projeto ${project.name} deletado com sucesso!` });
});
app.get("/members", (req, res) => {
  res.send(membersProjet);
});
app.post(
  "/member",
  [
    body("name").not().isEmpty().withMessage("O nome do membro é obrigatório"),
    body("office")
      .not()
      .isEmpty()
      .withMessage("O cargo do membro é obrigatório"),
    body("projectId").isInt({ gt: 0 }).withMessage("ID do projeto inválido"),
    body("send_email")
      .optional()
      .isString()
      .withMessage("O campo send_email deve ser uma string"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, office, projectId, send_email } = req.body;
    projectId = parseInt(projectId, 10);

    // Encontrar o projeto pelo ID
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }

    let id_member = generateId(project.members);
    // Criar o novo membro
    const newMember = { id_member, name, office, send_email };
    if (membersProjet.length >= 50) {
      membersProjet = membersProjet.splice(10);
    }
    const project_members = project.members.find(
      (p) => p.name.trim() === name.trim()
    );

    if (project_members) {
      return res
        .status(404)
        .json({ message: `Membro ${name} já se encontra na equipe.` });
    }

    membersProjet.push(newMember);
    // Adicionar o novo membro ao array de membros do projeto
    project.members.push(newMember);

    // Se o campo send_email estiver presente, fazer o log (simula o envio de um e-mail)
    if (send_email) {
      let html = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Projeto</title>
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
        <h1>Bem-vindo ao Projeto ${project.name}!</h1>
    </div>
    <div class="content">
        <h2>Detalhes da Adesão</h2>
        <p><strong>Nome:</strong> ${newMember.name}</p>
        <p><strong>Cargo:</strong> ${newMember.office}</p>
        <p><strong>Projeto:</strong> ${project.name}</p>
        <p><strong>Líder:</strong> ${project.leader}</p>
    </div>
    <div class="footer">
        Obrigado por juntar-se a nós!
    </div>
</div>
</body>
</html>

      `;
      enviarEmail(
        newMember.send_email,
        `Integração do(a) ${newMember.name} no projeto ${project.name}`,
        html
      );
    }

    // Responder com sucesso
    res.status(201).json({
      message: "Membro adicionado com sucesso ao projeto",
      project,
    });
  }
);
app.delete("/member/:projectId/:memberName", (req, res) => {
  const { projectId, memberName } = req.params;
  const project = projects.find((p) => p.id === parseInt(projectId));
  if (!project) {
    return res.status(404).json({ message: "Projeto não encontrado" });
  }

  const memberIndex = project.members.findIndex((m) => m.name === memberName);
  if (memberIndex === -1) {
    return res.status(404).json({ message: "Membro não encontrado" });
  }

  // Remove o membro do array de membros do projeto
  project.members.splice(memberIndex, 1);
  res.status(200).json({
    message: `Membro ${memberName} retirado do projeto ${project.name}`,
  });
});

//
// PAYMENTS
app.post(
  "/clients",
  [
    body("name").not().isEmpty().withMessage("O nome é obrigatório"),
    body("cpf")
      .matches(/^\d{11}$/)
      .withMessage("CPF inválido. Deve conter 11 dígitos sem pontos ou traços"),
    body("card.flag")
      .isIn(["MASTER", "VISA"])
      .withMessage("A bandeira do cartão deve ser MASTER ou VISA"),
    body("card.credit")
      .isFloat({ min: 1000 })
      .withMessage("O crédito deve ser um número válido maior ou igual a 1000"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const clients_name = clients.find(
      (p) => p.name.trim() === req.body.name.trim()
    );
    if (clients_name) {
      return res
        .status(400)
        .json({ errors: `${req.body.name} já existe na lista de Clientes.` });
    }

    // Cria um novo cliente e adiciona ao array de clientes
    const newClient = {
      id: generateId(clients),
      name: req.body.name,
      cpf: req.body.cpf,
      card: {
        flag: req.body.card.flag,
        credit: parseFloat(req.body.card.credit),
      },
    };
    if (clients.length > 50) {
      clients = clients.splice(0, 10);
    }

    clients.push(newClient);
    res
      .status(201)
      .json({ message: "Cliente registrado com sucesso!", client: newClient });
  }
);
app.get("/clients", (req, res) => {
  res.send(clients);
});
app.get("/clients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const client = clients.find((client) => client.id === id);
  if (!client) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }
  res.status(200).json(client);
});
app.put(
  "/clients/:id",
  [
    body("name")
      .optional()
      .not()
      .isEmpty()
      .withMessage("O nome não pode ser vazio"),
    body("cpf")
      .optional()
      .matches(/^\d{11}$/)
      .withMessage("CPF inválido. Deve conter 11 dígitos sem pontos ou traços"),
    body("card.flag")
      .optional()
      .isIn(["MASTER", "VISA"])
      .withMessage("A bandeira do cartão deve ser MASTER ou VISA"),
    body("card.credit")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("O crédito deve ser um número válido maior ou igual a zero"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const clientIndex = clients.findIndex((client) => client.id === id);
    if (clientIndex === -1) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    const client = clients[clientIndex];
    const updateData = req.body;

    // Atualizando os dados do cliente
    client.name = updateData.name || client.name;
    client.cpf = updateData.cpf || client.cpf;
    if (updateData.card) {
      client.card.flag = updateData.card.flag || client.card.flag;
      client.card.credit = updateData.card.credit || client.card.credit;
    }

    res.status(200).json({
      message: "Cliente atualizado com sucesso",
      client,
    });
  }
);
app.delete("/clients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const clientIndex = clients.findIndex((client) => client.id === id);
  if (clientIndex === -1) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  // Remove o cliente do array
  clients.splice(clientIndex, 1);
  res.status(200).json({ message: "Cliente deletado com sucesso" });
});

app.get("/products-gamers", (req, res) => {
  res.json(productsGamers());
});

app.post(
  "/products-purchase-gamers",
  [
    body("id_client").isInt({ min: 1 }).withMessage("ID do cliente inválido"),
    body("id_product").isInt({ min: 1 }).withMessage("ID do produto inválido"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { id_client, id_product, send_email } = req.body;
    id_client = parseInt(id_client, 10);
    id_product = parseInt(id_product, 10);
    const client = clients.find((c) => c.id === id_client);
    const product = productsGamers().find((p) => p.id === id_product);

    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    if (client.card.credit >= product.price) {
      client.card.credit -= product.price;
      res.status(201).json({
        message: "Compra realizada com sucesso",
        product: product.name,
        remainingCredit: client.card.credit,
      });
      if (send_email) {
        let html = `
        <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bem-vindo ao Projeto</title>
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
          <h1>${client.name}, parabéns pela compra ${product.name}!</h1>
      </div>
      <div class="content">
          <h2>Detalhes  da Compra</h2>
          <p><strong>Nome:</strong> ${product.name}</p>
          <p><strong>Descrição:</strong> ${product.description}</p>
          <p><strong>Valor:</strong> ${product.price}</p>
      </div>
      <div class="footer">
          Obrigado por comprar no conosco!
      </div>
  </div>
  </body>
  </html>
  
        `;
        enviarEmail(
          send_email,
          `Parabéns ${client.name} você adquiriu ${product.name}`,
          html
        );
      }
    } else {
      res.status(400).json({
        message: "Crédito insuficiente",
        requiredCredit: product.price,
        currentCredit: client.card.credit,
      });
    }
  }
);
app.post(
  "/credit",
  [
    body("id_client").isInt({ min: 1 }).withMessage("ID do cliente inválido"),
    body("id_product").isInt({ min: 1 }).withMessage("ID do produto inválido"),
    body("value_credit")
      .isInt({ min: 1, max: 15000 })
      .withMessage("O valor de crédito solicitado deve ser menor que 15000"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { id_client, id_product, value_credit } = req.body;
    id_client = parseInt(id_client, 10);
    id_product = parseInt(id_product, 10);
    const client = clients.find((c) => c.id === id_client);
    const product = productsGamers().find((p) => p.id === id_product);
    const credit_client = client.card.credit;
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    const totalCreditAvailable = client.card.credit + value_credit;
    if (totalCreditAvailable < product.price) {
      return res.status(400).json({
        message: `O crédito total após adicionar o empréstimo ainda é insuficiente para comprar o produto. Crédito necessário: ${product.price}, crédito disponível: ${totalCreditAvailable}`,
      });
    }

    if (client.card.credit >= product.price) {
      return res.status(400).json({
        message:
          "Crédito atual já é suficiente para comprar o produto " +
          client.card.credit,
      });
    }
    // Atualizar o crédito do cliente
    client.card.credit = totalCreditAvailable;

    if (product.price > totalCreditAvailable) {
      res.status(400).json({
        message: `O valor do produto ${product.price} ainda é maior que o crédito atual somado ao emprestimo ${value_sum}, ${client.name} faça um novo emprestimo`,
      });
    }

    res.status(200).json({
      message: "Crédito adicionado com sucesso",
      holdCredit: credit_client,
      newCredit: client.card.credit,
      client: client,
    });
  }
);
// CRIPTO
app.post(
  "/encrypt-data",
  [
    body("id_product"),
    body("id_financiamento_produtos"),
    body("id_projetos").isInt({ min: 1 }),
    body("id_product_gamers").isInt({ min: 1 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      id_product,
      id_financiamento_produtos,
      id_projetos,
      id_product_gamers,
    } = req.body;
    const dataToEncrypt = {
      id_product,
      id_financiamento_produtos,
      id_projetos,
      id_product_gamers,
    };

    // Usar a função de criptografia aqui
    const encryptedData = encrypt(dataToEncrypt);

    res.json({ crypto: encryptedData });
  }
);
app.post("/decrypt-validate", (req, res) => {
  const { crypto } = req.body;
  // Descriptografar os dados recebidos
  const decryptedData = decrypt(crypto);

  // Verificar a existência dos IDs
  const dataValidation = {
    id_product: loja.produtos.find((p) => p.id === decryptedData.id_product),
    id_financiamento_produtos: produtosDeLuxo.produtosDeLuxo.find(
      (f) => f.id === decryptedData.id_financiamento_produtos
    ),
    id_projetos: projects.find((p) => p.id === decryptedData.id_projetos),
    id_product_gamers: productsGamers().find(
      (p) => p.id === decryptedData.id_product_gamers
    ),
  };

  // Organizar os dados para resposta
  const responseData = {
    id_product: dataValidation.id_product
      ? `Produto [ ${dataValidation.id_product.nome} ] encontrado.`
      : `Produto ${decryptedData.id_product} não encontrado.`,
    id_financiamento_produtos: dataValidation.id_financiamento_produtos
      ? `Financiamento [ ${dataValidation.id_financiamento_produtos.nome} ] encontrado.`
      : `Financiamento ${decryptedData.id_financiamento_produtos} não encontrado.`,
    id_projetos: dataValidation.id_projetos
      ? `Projeto [ ${dataValidation.id_projetos.name} ] encontrado.`
      : `Projeto ${decryptedData.id_projetos} não encontrado.`,
    id_product_gamers: dataValidation.id_product_gamers
      ? `Produto Gamer [ ${dataValidation.id_product_gamers.name} ] encontrado.`
      : `Produto Gamer ${decryptedData.id_product_gamers} não encontrado.`,
  };

  res.json(responseData);
});

// COMPANY

app.get("/company", (req, res) => {
  res.send(company);
});
app.get(
  "/company/:companyId",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    res.status(200).send(company_);
  }
);
app.post(
  "/company",
  [
    body("name").notEmpty().withMessage("Nome é obrigatório"),
    body("cnpj")
      .isLength({ min: 14, max: 14 })
      .withMessage("CNPJ deve ter 14 dígitos")
      .isNumeric()
      .withMessage("CNPJ deve conter apenas números"),
    body("state").notEmpty().withMessage("Estado é obrigatório"),
    body("city").notEmpty().withMessage("Cidade é obrigatória"),
    body("address").notEmpty().withMessage("Endereço é obrigatório"),
    body("sector").notEmpty().withMessage("Setor é obrigatório"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, cnpj, state, city, address, sector } = req.body;

    const projectExists = company.some(
      (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (projectExists) {
      return res
        .status(400)
        .json({ message: `Já existe uma Empresa com o nome ${name}` });
    }
    if (company.length > 50) {
      company.splice(0, 10); // Remove os 10 primeiros
    }
    let newCompany = {
      id: generateId(company), // ID fictício
      name,
      cnpj,
      state,
      city,
      address,
      sector,
      products: [],
      employees: [],
      services: [],
    };
    company.push(newCompany);
    return res.status(201).send(newCompany);
  }
);
app.put(
  "/company/:id",
  [
    param("id").isInt().withMessage("ID deve ser um número inteiro"),
    body("name").optional().notEmpty().withMessage("Nome não pode ser vazio"),
    body("cnpj")
      .optional()
      .isLength({ min: 14, max: 14 })
      .withMessage("CNPJ deve ter 14 dígitos")
      .isNumeric()
      .withMessage("CNPJ deve conter apenas números"),
    body("state")
      .optional()
      .notEmpty()
      .withMessage("Estado não pode ser vazio"),
    body("city").optional().notEmpty().withMessage("Cidade não pode ser vazia"),
    body("address")
      .optional()
      .notEmpty()
      .withMessage("Endereço não pode ser vazio"),
    body("sector")
      .optional()
      .notEmpty()
      .withMessage("Setor não pode ser vazio"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const companyIndex = company.findIndex(
      (company) => company.id === parseInt(id)
    );

    if (companyIndex === -1) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const { name, cnpj, state, city, address, sector } = req.body;

    // Atualizar somente os campos fornecidos na requisição
    const updatedCompany = company[companyIndex];
    if (name) updatedCompany.name = name;
    if (cnpj) updatedCompany.cnpj = cnpj;
    if (state) updatedCompany.state = state;
    if (city) updatedCompany.city = city;
    if (address) updatedCompany.address = address;
    if (sector) updatedCompany.sector = sector;

    company[companyIndex] = updatedCompany;

    res.status(200).send({
      message: "Empresa atualizada com sucesso",
      company: updatedCompany,
    });
  }
);

app.delete(
  "/company/:id",
  [param("id").isInt().withMessage("ID deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const companyIndex = company.findIndex(
      (company) => company.id === parseInt(id)
    );

    if (companyIndex === -1) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    // Remover a empresa
    company.splice(companyIndex, 1);

    // Responder que a empresa foi deletada
    res.status(200).send({ message: "Empresa deletada com sucesso" });
  }
);
// PRODUCTS COMPANY
app.get(
  "/company/:companyId/products",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId, productId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }
    const product = company_.products;
    res.status(200).send(product);
  }
);
app.post(
  "/company/:companyId/products",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    body("productName").notEmpty().withMessage("Nome do produto é obrigatório"),
    body("productDescription")
      .notEmpty()
      .withMessage("Descrição do produto é obrigatória"),
    body("price")
      .isInt({ min: 0 })
      .withMessage("Preço deve ser um número inteiro positivo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const { productName, productDescription, price } = req.body;

    const verify_name = company_.products.find(
      (c) =>
        c.productName.trim().toLowerCase() === productName.trim().toLowerCase()
    );
    if (verify_name) {
      return res
        .status(400)
        .send({ message: `${productName}  já existe nos produtos.` });
    }
    if (company_.products.length > 10) {
      company_.products.splice(0, 5); // Remove os 10 primeiros
    }

    const productId = company_.products.length + 1; // Simples ID incremental
    const newProduct = { productId, productName, productDescription, price };
    company_.products.push(newProduct);

    res.status(201).send({
      message: "Produto adicionado com sucesso",
      product: newProduct,
    });
  }
);
app.get(
  "/company/:companyId/products/:productId",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    param("productId")
      .isInt()
      .withMessage("ID do produto deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId, productId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }
    const product = company_.products.find(
      (p) => p.productId === parseInt(productId)
    );
    if (!product) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }
    res.status(200).send(product);
  }
);
app.put(
  "/company/:companyId/products/:productId",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    param("productId")
      .isInt()
      .withMessage("ID do produto deve ser um número inteiro"),
    body("productName")
      .optional()
      .notEmpty()
      .withMessage("Nome do produto não pode ser vazio"),
    body("productDescription")
      .optional()
      .notEmpty()
      .withMessage("Descrição do produto não pode ser vazia"),
    body("price")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Preço deve ser um número inteiro positivo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId, productId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const productIndex = company_.products.findIndex(
      (p) => p.productId === parseInt(productId)
    );
    if (productIndex === -1) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    const product = company_.products[productIndex];
    const { productName, productDescription, price } = req.body;
    if (productName) product.productName = productName;
    if (productDescription) product.productDescription = productDescription;
    if (price) product.price = price;

    res.status(200).send({
      message: "Produto atualizado com sucesso",
      product,
    });
  }
);
app.delete(
  "/company/:companyId/products/:productId",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    param("productId")
      .isInt()
      .withMessage("ID do produto deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId, productId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const productIndex = company_.products.findIndex(
      (p) => p.productId === parseInt(productId)
    );
    if (productIndex === -1) {
      return res.status(404).send({ message: "Produto não encontrado" });
    }

    company_.products.splice(productIndex, 1);

    res.status(200).send({ message: "Produto removido com sucesso" });
  }
);

//

// EMPLOYEES
app.get(
  "/company/:companyId/employees",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { companyId, productId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const employee = company_.employees;

    res.status(200).send(employee);
  }
);
app.post(
  "/company/:companyId/employees",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    body("name").notEmpty().withMessage("name do produto é obrigatório"),
    body("position")
      .notEmpty()
      .withMessage("position do produto é obrigatória"),
    body("email")
      .isEmail()
      .withMessage("Deve ser um email válido")
      .notEmpty()
      .withMessage("O campo email é obrigatório"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const { name, position, email } = req.body;

    const verify_name = company_.employees.find(
      (c) => c.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (verify_name) {
      return res
        .status(400)
        .send({ message: `${name} já existe nos Employees.` });
    }
    if (company_.employees.length > 10) {
      company_.employees.splice(0, 5); // Remove os 10 primeiros
    }
    const employeeId = company_.employees.length + 1; // Simples ID incremental
    const newProduct = { employeeId, name, position, email };
    company_.employees.push(newProduct);

    res.status(201).send({
      message: "Funcionário(q) adicionado(a) com sucesso",
      employees: newProduct,
    });
  }
);
app.get(
  "/company/:companyId/employees/:employeeId",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    param("employeeId")
      .isInt()
      .withMessage("ID do funcionário deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { companyId, employeeId } = req.params;
    if (company.id !== parseInt(companyId)) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const employee = company.employees.find(
      (e) => e.employeeId === parseInt(employeeId)
    );
    if (!employee) {
      return res.status(404).send({ message: "Funcionário não encontrado" });
    }

    res.status(200).send(employee);
  }
);
app.put(
  "/company/:companyId/employees/:employeeId",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    param("employeeId")
      .isInt()
      .withMessage("ID do employeeId deve ser um número inteiro"),
    body("name")
      .optional()
      .notEmpty()
      .withMessage("name do produto não pode ser vazio"),
    body("position")
      .optional()
      .notEmpty()
      .withMessage("position do produto não pode ser vazia"),
    body("email").optional().isEmail().withMessage("Deve ser um email válido"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId, employeeId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const employeeIndex = company_.employees.findIndex(
      (p) => p.employeeId === parseInt(employeeId)
    );
    if (employeeIndex === -1) {
      return res.status(404).send({ message: "Funcionário não encontrado" });
    }

    const employee = company_.employees[employeeIndex];
    const { name, position, email } = req.body;
    if (name) employee.name = name;
    if (position) employee.position = position;
    if (email) employee.email = email;

    res.status(200).send({
      message: `Funcionário(a) ${name} atualizado.`,
      employee,
    });
  }
);
app.delete(
  "/company/:companyId/employees/:employeeId",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    param("employeeId")
      .isInt()
      .withMessage("ID do produto deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId, employeeId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const productIndex = company_.employees.findIndex(
      (p) => p.employeeId === parseInt(employeeId)
    );
    if (productIndex === -1) {
      return res.status(404).send({ message: "Funcionário(a) não encontrado" });
    }

    company_.employees.splice(productIndex, 1);

    res.status(200).send({ message: "Funcionário(a) removido com sucesso" });
  }
);
//

// SERVICE
app.get(
  "/company/:companyId/services",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId, productId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const service = company_.services;

    res.status(200).send(service);
  }
);
app.post(
  "/company/:companyId/services",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    body("serviceName")
      .notEmpty()
      .withMessage("serviceName do produto é obrigatório"),
    body("serviceDescription")
      .notEmpty()
      .withMessage("serviceDescription do produto é obrigatória"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const { serviceName, serviceDescription } = req.body;

    const verify_name = company_.services.find(
      (c) =>
        c.serviceName.trim().toLowerCase() === serviceName.trim().toLowerCase()
    );
    if (verify_name) {
      return res
        .status(400)
        .send({ message: `${serviceName} já existe nos Serviços.` });
    }
    if (company_.services.length > 10) {
      company_.services.splice(0, 5); // Remove os 10 primeiros
    }

    const serviceId = company_.services.length + 1; // Simples ID incremental
    const newProduct = { serviceId, serviceName, serviceDescription };
    company_.services.push(newProduct);

    res.status(201).send({
      message: "Serviço adicionado com sucesso",
      services: newProduct,
    });
  }
);
app.get(
  "/company/:companyId/services/:serviceId",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    param("serviceId")
      .isInt()
      .withMessage("ID do serviço deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId, serviceId } = req.params;
    if (company.id !== parseInt(companyId)) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const service = company.services.find(
      (s) => s.serviceId === parseInt(serviceId)
    );
    if (!service) {
      return res.status(404).send({ message: "Serviço não encontrado" });
    }

    res.status(200).send(service);
  }
);
app.put(
  "/company/:companyId/services/:serviceId",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    param("serviceId")
      .isInt()
      .withMessage("ID do serviceId deve ser um número inteiro"),
    body("serviceName")
      .optional()
      .notEmpty()
      .withMessage("serviceName do serviço não pode ser vazio"),
    body("serviceDescription")
      .optional()
      .notEmpty()
      .withMessage("Descrição do serviço não pode ser vazia"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { serviceName, serviceDescription } = req.body;

    const { companyId, serviceId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const serviceIndex = company_.services.findIndex(
      (p) => p.serviceId === parseInt(serviceId)
    );
    if (serviceIndex === -1) {
      return res.status(404).send({ message: "Serviço não encontrado" });
    }
    const verify_name = company_.services.find(
      (c) =>
        c.serviceName.trim().toLowerCase() === serviceName.trim().toLowerCase()
    );
    if (verify_name) {
      return res
        .status(400)
        .send({ message: `${serviceName} já existe nos Serviços.` });
    }

    const service = company_.services[serviceIndex];
    if (serviceName) service.serviceName = serviceName;
    if (serviceDescription) service.serviceDescription = serviceDescription;

    res.status(200).send({
      message: `Serviço ${serviceName} atualizado.`,
      service,
    });
  }
);
app.delete(
  "/company/:companyId/services/:serviceId",
  [
    param("companyId")
      .isInt()
      .withMessage("ID da empresa deve ser um número inteiro"),
    param("serviceId")
      .isInt()
      .withMessage("ID do serviceId deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyId, serviceId } = req.params;
    const company_ = company.find((c) => c.id === parseInt(companyId));
    if (!company_) {
      return res.status(404).send({ message: "Empresa não encontrada" });
    }

    const productIndex = company_.services.findIndex(
      (p) => p.serviceId === parseInt(serviceId)
    );
    if (productIndex === -1) {
      return res.status(404).send({ message: "Serviço não encontrado" });
    }

    company_.services.splice(productIndex, 1);

    res.status(200).send({ message: "Serviço removido com sucesso" });
  }
);

// MERCADO
app.get("/mercado", (req, res) => {
  res.send(mercado);
});
app.post(
  "/mercado",
  [
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("cnpj")
      .not()
      .isEmpty()
      .withMessage("CNPJ é obrigatório")
      .isLength({ min: 14, max: 14 })
      .withMessage("CNPJ deve ter 14 dígitos"),
    body("endereco").not().isEmpty().withMessage("Endereço é obrigatório"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Adicionando todos os campos de produtos com suas subcategorias inicialmente vazias
    const novoMercado = {
      id: generateId(mercado),
      nome: req.body.nome,
      cnpj: req.body.cnpj,
      endereco: req.body.endereco,
      produtos: {
        hortifruit: [{ frutas: [] }, { legumes: [] }],
        padaria: [{ doces: [] }, { salgados: [] }],
        acougue: [{ bovinos: [] }, { suinos: [] }, { aves: [] }],
        peixaria: [{ peixes: [] }, { frutos_do_mar: [] }],
        frios: [{ queijos: [] }, { embutidos: [] }, { outros: [] }],
        mercearia: [
          { graos_cereais: [] },
          { massas: [] },
          { farinhas: [] },
          { conservados_enlatados: [] },
          { oleos: [] },
          { temperos_condimentos: [] },
        ],
        bebidas: [{ com_alcool: [] }, { sem_alcool: [] }],
        higienelimpeza: [{ higiene: [] }, { limpeza: [] }],
      },
    };
    if (mercado.length > 50) {
      mercado.splice(0, 10); // Remove os 10 primeiros
    }
    const verify_name = mercado.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de Mercados.`,
      });
    }
    mercado.push(novoMercado);
    // Simulando uma resposta de sucesso
    res.status(201).send({
      message: `Mercado '${novoMercado.nome}' adicionado com sucesso com todas as subcategorias iniciais vazias!`,
      novoMercado,
    });
  }
);
app.get(
  "/mercado/:mercadoId",
  [
    param("mercadoId")
      .isInt()
      .withMessage("ID do Mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const mercado_ = mercado.find(
      (m) => m.id === parseInt(req.params.mercadoId)
    );
    if (!mercado_) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send(mercado_);
  }
);
app.get(
  "/mercado/:mercadoId/produtos",
  [
    param("mercadoId")
      .isInt()
      .withMessage("ID do Mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const mercado_ = mercado.find(
      (m) => m.id === parseInt(req.params.mercadoId)
    );
    if (!mercado_) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send(mercado_.produtos);
  }
);
app.put(
  "/mercado/:mercadoId",
  [
    param("mercadoId")
      .isInt()
      .withMessage("ID do Mercado deve ser um número inteiro"),
    body("nome")
      .optional()
      .isString()
      .withMessage("Nome deve ser uma string válida"),
    body("cnpj")
      .optional()
      .isString()
      .withMessage("CNPJ deve ser uma string válida"),
    body("endereco")
      .optional()
      .isString()
      .withMessage("Endereço deve ser uma string válida"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const index = mercado.findIndex(
      (m) => m.id === parseInt(req.params.mercadoId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    const updatedMercado = {
      ...mercado[index],
      ...req.body,
    };

    mercado[index] = updatedMercado;

    res.send({
      message: `Mercado com ID ${req.params.mercadoId} atualizado com sucesso.`,
      updatedMercado,
    });
  }
);
app.delete(
  "/mercado/:mercadoId",
  [
    param("mercadoId")
      .isInt()
      .withMessage("ID do Mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const index = mercado.findIndex(
      (m) => m.id === parseInt(req.params.mercadoId)
    );
    console.log(index)
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.status(200).json({
      message: `Mercado com ID ${req.params.mercadoId} foi removido com sucesso.`,
    });
    mercado.splice(index, 1);

  }
);
// HORTIFRUIT
app.post(
  "/mercado/:id/produtos/hortifruit/frutas",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Adicionando o novo produto na categoria de frutas do hortifruit do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.hortifruit[0].frutas.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de Frutas.`,
      });
    }

    if (mercado_.produtos.hortifruit[0].frutas.length > 10) {
      mercado_.produtos.hortifruit[0].frutas.splice(0, 3);
    }

    mercado_.produtos.hortifruit[0].frutas.push({
      id: generateId(mercado_.produtos.hortifruit[0].frutas),
      nome,
      valor,
    });
    const frutas = mercado_.produtos.hortifruit[0].frutas;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às frutas do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      frutas,
    });
  }
);
app.get(
  "/mercado/:id/produtos/hortifruit/frutas",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de frutas do hortifruit do mercado especificado
    const frutas = mercado_.produtos.hortifruit[0].frutas;
    if (!frutas || frutas.length === 0) {
      return res.status(404).send({
        message: "Não há frutas cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de frutas do mercado ${mercado_.nome}`,
      frutas,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/hortifruit/frutas/:frutaId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("frutaId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de frutas do hortifruit do mercado especificado
    const frutas = mercado_.produtos.hortifruit[0].frutas;
    if (!frutas || frutas.length === 0) {
      return res.status(404).send({
        message: "Não há frutas cadastradas neste mercado.",
      });
    }
    const index = frutas.findIndex(
      (m) => m.id === parseInt(req.params.frutaId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Fruta ${frutas[0].nome} com ID ${req.params.frutaId} foi removido com sucesso.`,
    });
    frutas.splice(index, 1);
  }
);
// LEGUMES
app.post(
  "/mercado/:id/produtos/hortifruit/legumes",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Adicionando o novo produto na categoria de legumes do hortifruit do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.hortifruit[1].legumes.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de Legumes.`,
      });
    }
    if (mercado_.produtos.hortifruit[1].legumes.length > 10) {
      mercado_.produtos.hortifruit[1].legumes.splice(0, 3);
    }

    mercado_.produtos.hortifruit[1].legumes.push({
      id: generateId(mercado_.produtos.hortifruit[1].legumes),
      nome,
      valor,
    });
    const legumes = mercado_.produtos.hortifruit[1].legumes;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às legumes do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      legumes,
    });
  }
);
app.get(
  "/mercado/:id/produtos/hortifruit/legumes",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de legumes do hortifruit do mercado especificado
    const legumes = mercado_.produtos.hortifruit[1].legumes;
    if (!legumes || legumes.length === 0) {
      return res.status(404).send({
        message: "Não há legumes cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de legumes do mercado ${mercado_.nome}`,
      legumes,
    });
  }
);

app.delete(
  "/mercado/:id/produtos/hortifruit/legumes/:legumesId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("legumesId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de frutas do hortifruit do mercado especificado
    const legumes = mercado_.produtos.hortifruit[1].legumes;
    if (!legumes || legumes.length === 0) {
      return res.status(404).send({
        message: "Não há legumes cadastradas neste mercado.",
      });
    }
    const index = legumes.findIndex(
      (m) => m.id === parseInt(req.params.legumesId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Legume ${legumes[0].nome} com ID ${req.params.legumesId} foi removido com sucesso.`,
    });
    legumes.splice(index, 1);
  }
);
// PADARIA
app.post(
  "/mercado/:id/produtos/padaria/doces",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Adicionando o novo produto na categoria de doces do padaria do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.padaria[0].doces.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de doces.`,
      });
    }
    if (mercado_.produtos.padaria[0].doces.length > 10) {
      mercado_.produtos.padaria[0].doces.splice(0, 3);
    }

    mercado_.produtos.padaria[0].doces.push({
      id: generateId(mercado_.produtos.padaria[0].doces),
      nome,
      valor,
    });
    const doces = mercado_.produtos.padaria[0].doces;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso aos doces do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      doces,
    });
  }
);
app.get(
  "/mercado/:id/produtos/padaria/doces",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de doces do padaria do mercado especificado
    const doces = mercado_.produtos.padaria[0].doces;
    if (!doces || doces.length === 0) {
      return res.status(404).send({
        message: "Não há doces cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de doces do mercado ${mercado_.nome}`,
      doces,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/padaria/doces/:docesId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("docesId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de frutas do padaria do mercado especificado
    const doces = mercado_.produtos.padaria[0].doces;
    if (!doces || doces.length === 0) {
      return res.status(404).send({
        message: "Não há doces cadastradas neste mercado.",
      });
    }
    const index = doces.findIndex((m) => m.id === parseInt(req.params.docesId));
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Doce ${doces[0].nome} com ID ${req.params.docesId} foi removido com sucesso.`,
    });
    doces.splice(index, 1);
  }
);

// padaria salgado

app.post(
  "/mercado/:id/produtos/padaria/salgados",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Adicionando o novo produto na categoria de salgados do padaria do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.padaria[1].salgados.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de salgados.`,
      });
    }

    if (mercado_.produtos.padaria[1].salgados.length > 10) {
      mercado_.produtos.padaria[1].salgados.splice(0, 3);
    }

    mercado_.produtos.padaria[1].salgados.push({
      id: generateId(mercado_.produtos.padaria[1].salgados),
      nome,
      valor,
    });
    const salgados = mercado_.produtos.padaria[1].salgados;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso aos salgados do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      salgados,
    });
  }
);
app.get(
  "/mercado/:id/produtos/padaria/salgados",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de salgados do padaria do mercado especificado
    const salgados = mercado_.produtos.padaria[1].salgados;
    if (!salgados || salgados.length === 0) {
      return res.status(404).send({
        message: "Não há salgados cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de salgados do mercado ${mercado_.nome}`,
      salgados,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/padaria/salgados/:salgadosId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("salgadosId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de frutas do padaria do mercado especificado
    const salgados = mercado_.produtos.padaria[1].salgados;
    if (!salgados || salgados.length === 0) {
      return res.status(404).send({
        message: "Não há salgados cadastradas neste mercado.",
      });
    }
    const index = salgados.findIndex(
      (m) => m.id === parseInt(req.params.salgadosId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Salgado ${salgados[0].nome} com ID ${req.params.salgadosId} foi removido com sucesso.`,
    });
    salgados.splice(index, 1);
  }
);
//  "acougue": [{ "bovinos": [] }, { "suinos": [] }, { "aves": [] }],
app.post(
  "/mercado/:id/produtos/acougue/bovinos",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de bovinos do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.acougue[0].bovinos.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de bovinos.`,
      });
    }
    if (mercado_.produtos.acougue[0].bovinos.length > 10) {
      mercado_.produtos.acougue[0].bovinos.splice(0, 3);
    }
    mercado_.produtos.acougue[0].bovinos.push({
      id: generateId(mercado_.produtos.acougue[0].bovinos),
      nome,
      valor,
    });
    const bovinos = mercado_.produtos.acougue[0].bovinos;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às bovinos do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      bovinos,
    });
  }
);
app.get(
  "/mercado/:id/produtos/acougue/bovinos",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de bovinos do acougue do mercado especificado
    const bovinos = mercado_.produtos.acougue[0].bovinos;
    if (!bovinos || bovinos.length === 0) {
      return res.status(404).send({
        message: "Não há bovinos cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de bovinos do mercado ${mercado_.nome}`,
      bovinos,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/acougue/bovinos/:frutaId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("frutaId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de bovinos do acougue do mercado especificado
    const bovinos = mercado_.produtos.acougue[0].bovinos;
    if (!bovinos || bovinos.length === 0) {
      return res.status(404).send({
        message: "Não há bovinos cadastradas neste mercado.",
      });
    }
    const index = bovinos.findIndex(
      (m) => m.id === parseInt(req.params.frutaId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Bovino ${bovinos[0].nome} com ID ${req.params.frutaId} foi removido com sucesso.`,
    });
    bovinos.splice(index, 1);
  }
);

// suinos
app.post(
  "/mercado/:id/produtos/acougue/suinos",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de suinos do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.acougue[1].suinos.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de suinos.`,
      });
    }
    if (mercado_.produtos.acougue[1].suinos.length > 10) {
      mercado_.produtos.acougue[1].suinos.splice(0, 3);
    }
    mercado_.produtos.acougue[1].suinos.push({
      id: generateId(mercado_.produtos.acougue[1].suinos),
      nome,
      valor,
    });
    const suinos = mercado_.produtos.acougue[1].suinos;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso no setor [suinos] do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      suinos,
    });
  }
);
app.get(
  "/mercado/:id/produtos/acougue/suinos",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de suinos do acougue do mercado especificado
    const suinos = mercado_.produtos.acougue[1].suinos;
    if (!suinos || suinos.length === 0) {
      return res.status(404).send({
        message: "Não há suinos cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de suinos do mercado ${mercado_.nome}`,
      suinos,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/acougue/suinos/:suinoId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("suinoId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de suinos do acougue do mercado especificado
    const suinos = mercado_.produtos.acougue[1].suinos;
    if (!suinos || suinos.length === 0) {
      return res.status(404).send({
        message: "Não há suinos cadastradas neste mercado.",
      });
    }
    const index = suinos.findIndex(
      (m) => m.id === parseInt(req.params.suinoId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Suíno ${suinos[0].nome} com ID ${req.params.suinoId} foi removido com sucesso.`,
    });
    suinos.splice(index, 1);
  }
);

// aves
app.post(
  "/mercado/:id/produtos/acougue/aves",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de aves do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.acougue[2].aves.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de aves.`,
      });
    }

    if (mercado_.produtos.acougue[2].aves.length > 10) {
      mercado_.produtos.acougue[2].aves.splice(0, 3);
    }

    mercado_.produtos.acougue[2].aves.push({
      id: generateId(mercado_.produtos.acougue[2].aves),
      nome,
      valor,
    });
    const aves = mercado_.produtos.acougue[2].aves;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso no setor [aves] do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      aves,
    });
  }
);
app.get(
  "/mercado/:id/produtos/acougue/aves",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de aves do acougue do mercado especificado
    const aves = mercado_.produtos.acougue[2].aves;
    if (!aves || aves.length === 0) {
      return res.status(404).send({
        message: "Não há aves cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de aves do mercado ${mercado_.nome}`,
      aves,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/acougue/aves/:suinoId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("suinoId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de aves do acougue do mercado especificado
    const aves = mercado_.produtos.acougue[2].aves;
    if (!aves || aves.length === 0) {
      return res.status(404).send({
        message: "Não há aves cadastradas neste mercado.",
      });
    }
    const index = aves.findIndex((m) => m.id === parseInt(req.params.suinoId));
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Ave ${aves[0].nome} com ID ${req.params.suinoId} foi removido com sucesso.`,
    });
    aves.splice(index, 1);
  }
);
// peixaria
app.post(
  "/mercado/:id/produtos/peixaria/peixes",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de peixes do peixaria do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.peixaria[0].peixes.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de peixes.`,
      });
    }
    if (mercado_.produtos.peixaria[0].peixes.length > 10) {
      mercado_.produtos.peixaria[0].peixes.splice(0, 3);
    }
    mercado_.produtos.peixaria[0].peixes.push({
      id: generateId(mercado_.produtos.peixaria[0].peixes),
      nome,
      valor,
    });
    const peixes = mercado_.produtos.peixaria[0].peixes;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso no setor [peixes] do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      peixes,
    });
  }
);
app.get(
  "/mercado/:id/produtos/peixaria/peixes",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de peixes do peixaria do mercado especificado
    const peixes = mercado_.produtos.peixaria[0].peixes;
    if (!peixes || peixes.length === 0) {
      return res.status(404).send({
        message: "Não há peixes cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de peixes do mercado ${mercado_.nome}`,
      peixes,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/peixaria/peixes/:peixeId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("peixeId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de peixes do peixaria do mercado especificado
    const peixes = mercado_.produtos.peixaria[0].peixes;
    if (!peixes || peixes.length === 0) {
      return res.status(404).send({
        message: "Não há peixes cadastradas neste mercado.",
      });
    }
    const index = peixes.findIndex(
      (m) => m.id === parseInt(req.params.peixeId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Peixe ${peixes[0].nome} com ID ${req.params.peixeId} foi removido com sucesso.`,
    });
    peixes.splice(index, 1);
  }
);
//

//  "frios": [{ "queijos": [] }, { "embutidos": [] }, { "outros": [] }],
app.post(
  "/mercado/:id/produtos/frios/queijos",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de queijos do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.frios[0].queijos.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de queijos.`,
      });
    }

    if (mercado_.produtos.frios[0].queijos.length > 10) {
      mercado_.produtos.frios[0].queijos.splice(0, 3);
    }

    mercado_.produtos.frios[0].queijos.push({
      id: generateId(mercado_.produtos.frios[0].queijos),
      nome,
      valor,
    });
    const queijos = mercado_.produtos.frios[0].queijos;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às queijos do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      queijos,
    });
  }
);
app.get(
  "/mercado/:id/produtos/frios/queijos",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijos do frios do mercado especificado
    const queijos = mercado_.produtos.frios[0].queijos;
    if (!queijos || queijos.length === 0) {
      return res.status(404).send({
        message: "Não há queijos cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de queijos do mercado ${mercado_.nome}`,
      queijos,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/frios/queijos/:queijosId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("queijosId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do frios do mercado especificado
    const queijos = mercado_.produtos.frios[0].queijos;
    if (!queijos || queijos.length === 0) {
      return res.status(404).send({
        message: "Não há queijos cadastradas neste mercado.",
      });
    }
    const index = queijos.findIndex(
      (m) => m.id === parseInt(req.params.queijosId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Queijo ${queijos[0].nome} com ID ${req.params.queijosId} foi removido com sucesso.`,
    });
    queijos.splice(index, 1);
  }
);

// embutidos
app.post(
  "/mercado/:id/produtos/frios/embutidos",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de embutidos do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.frios[1].embutidos.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de embutidos.`,
      });
    }

    if (mercado_.produtos.frios[1].embutidos.length > 10) {
      mercado_.produtos.frios[1].embutidos.splice(0, 3);
    }
    mercado_.produtos.frios[1].embutidos.push({
      id: generateId(mercado_.produtos.frios[1].embutidos),
      nome,
      valor,
    });
    const embutidos = mercado_.produtos.frios[1].embutidos;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às embutidos do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      embutidos,
    });
  }
);
app.get(
  "/mercado/:id/produtos/frios/embutidos",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de embutidos do frios do mercado especificado
    const embutidos = mercado_.produtos.frios[1].embutidos;
    if (!embutidos || embutidos.length === 0) {
      return res.status(404).send({
        message: "Não há embutidos cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de embutidos do mercado ${mercado_.nome}`,
      embutidos,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/frios/embutidos/:embutidosId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("embutidosId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do frios do mercado especificado
    const embutidos = mercado_.produtos.frios[1].embutidos;
    if (!embutidos || embutidos.length === 0) {
      return res.status(404).send({
        message: "Não há embutidos cadastradas neste mercado.",
      });
    }
    const index = embutidos.findIndex(
      (m) => m.id === parseInt(req.params.embutidosId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Embutido ${embutidos[0].nome} com ID ${req.params.embutidosId} foi removido com sucesso.`,
    });
    embutidos.splice(index, 1);
  }
);
// outros
app.post(
  "/mercado/:id/produtos/frios/outros",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de outros do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.frios[2].outros.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de outros.`,
      });
    }
    if (mercado_.produtos.frios[2].outros.length > 10) {
      mercado_.produtos.frios[2].outros.splice(0, 3);
    }

    mercado_.produtos.frios[2].outros.push({
      id: generateId(mercado_.produtos.frios[2].outros),
      nome,
      valor,
    });
    const outros = mercado_.produtos.frios[2].outros;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às outros do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      outros,
    });
  }
);
app.get(
  "/mercado/:id/produtos/frios/outros",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de outros do frios do mercado especificado
    const outros = mercado_.produtos.frios[2].outros;
    if (!outros || outros.length === 0) {
      return res.status(404).send({
        message: "Não há outros cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de outros do mercado ${mercado_.nome}`,
      outros,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/frios/outros/:outrosId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("outrosId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do frios do mercado especificado
    const outros = mercado_.produtos.frios[2].outros;
    if (!outros || outros.length === 0) {
      return res.status(404).send({
        message: "Não há outros cadastradas neste mercado.",
      });
    }
    const index = outros.findIndex(
      (m) => m.id === parseInt(req.params.outrosId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `Outros ${outros[0].nome} com ID ${req.params.outrosId} foi removido com sucesso.`,
    });
    outros.splice(index, 1);
  }
);
// frutos do mar
app.post(
  "/mercado/:id/produtos/peixaria/frutosDoMar",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de frutosDoMar do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.peixaria[1].frutos_do_mar.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de frutosDoMar.`,
      });
    }
    if (mercado_.produtos.peixaria[1].frutos_do_mar.length > 10) {
      mercado_.produtos.peixaria[1].frutos_do_mar.splice(0, 3);
    }
    mercado_.produtos.peixaria[1].frutos_do_mar.push({
      id: generateId(mercado_.produtos.peixaria[1].frutos_do_mar),
      nome,
      valor,
    });
    const frutosDoMar = mercado_.produtos.peixaria[1].frutos_do_mar;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às frutosDoMar do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      frutosDoMar,
    });
  }
);
app.get(
  "/mercado/:id/produtos/peixaria/frutosDoMar",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de frutosDoMar do frios do mercado especificado
    const frutosDoMar = mercado_.produtos.peixaria[1].frutos_do_mar;
    if (!frutosDoMar || frutosDoMar.length === 0) {
      return res.status(404).send({
        message: "Não há frutosDoMar cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de frutosDoMar do mercado ${mercado_.nome}`,
      frutosDoMar,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/peixaria/frutosDoMar/:frutosDoMarId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("frutosDoMarId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do peixaria do mercado especificado
    const frutosDoMar = mercado_.produtos.peixaria[1].frutos_do_mar;
    if (!frutosDoMar || frutosDoMar.length === 0) {
      return res.status(404).send({
        message: "Não há frutosDoMar cadastradas neste mercado.",
      });
    }
    const index = frutosDoMar.findIndex(
      (m) => m.id === parseInt(req.params.frutosDoMarId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `frutosDoMar ${frutosDoMar[0].nome} com ID ${req.params.frutosDoMarId} foi removido com sucesso.`,
    });
    frutosDoMar.splice(index, 1);
  }
);
// mercearia graos cereais
app.post(
  "/mercado/:id/produtos/mercearia/graosCereais",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de graosCereais do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.mercearia[0].graos_cereais.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de graosCereais.`,
      });
    }
    if (mercado_.produtos.mercearia[0].graos_cereais.length > 10) {
      mercado_.produtos.mercearia[0].graos_cereais.splice(0, 3);
    }
    mercado_.produtos.mercearia[0].graos_cereais.push({
      id: generateId(mercado_.produtos.mercearia[0].graos_cereais),
      nome,
      valor,
    });
    const graosCereais = mercado_.produtos.mercearia[0].graos_cereais;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às graosCereais do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      graosCereais,
    });
  }
);
app.get(
  "/mercado/:id/produtos/mercearia/graosCereais",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de graosCereais do mercearia do mercado especificado
    const graosCereais = mercado_.produtos.mercearia[0].graos_cereais;
    if (!graosCereais || graosCereais.length === 0) {
      return res.status(404).send({
        message: "Não há graosCereais cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de graosCereais do mercado ${mercado_.nome}`,
      graosCereais,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/mercearia/graosCereais/:graosCereaisId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("graosCereaisId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do mercearia do mercado especificado
    const graosCereais = mercado_.produtos.mercearia[0].graos_cereais;
    if (!graosCereais || graosCereais.length === 0) {
      return res.status(404).send({
        message: "Não há graosCereais cadastradas neste mercado.",
      });
    }
    const index = graosCereais.findIndex(
      (m) => m.id === parseInt(req.params.graosCereaisId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }

    res.send({
      message: `graosCereais ${graosCereais[0].nome} com ID ${req.params.graosCereaisId} foi removido com sucesso.`,
    });
    graosCereais.splice(index, 1);
  }
);

// massas
app.post(
  "/mercado/:id/produtos/mercearia/massas",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de massas do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.mercearia[1].massas.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de massas.`,
      });
    }
    if (mercado_.produtos.mercearia[1].massas.length > 10) {
      mercado_.produtos.mercearia[1].massas.splice(0, 3);
    }

    mercado_.produtos.mercearia[1].massas.push({
      id: generateId(mercado_.produtos.mercearia[1].massas),
      nome,
      valor,
    });
    const massas = mercado_.produtos.mercearia[1].massas;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às massas do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      massas,
    });
  }
);
app.get(
  "/mercado/:id/produtos/mercearia/massas",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de massas do mercearia do mercado especificado
    const massas = mercado_.produtos.mercearia[1].massas;
    if (!massas || massas.length === 0) {
      return res.status(404).send({
        message: "Não há massas cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de massas do mercado ${mercado_.nome}`,
      massas,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/mercearia/massas/:massasId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("massasId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do mercearia do mercado especificado
    const massas = mercado_.produtos.mercearia[1].massas;
    if (!massas || massas.length === 0) {
      return res.status(404).send({
        message: "Não há massas cadastradas neste mercado.",
      });
    }
    const index = massas.findIndex(
      (m) => m.id === parseInt(req.params.massasId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send({
      message: `${massas[0].nome} com ID ${req.params.massasId} foi removido com sucesso.`,
    });
    massas.splice(index, 1);
  }
);

// merc farinhas

app.post(
  "/mercado/:id/produtos/mercearia/farinhas",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de farinhas do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.mercearia[2].farinhas.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de farinhas.`,
      });
    }
    if (mercado_.produtos.mercearia[2].farinhas.length > 9) {
      mercado_.produtos.mercearia[2].farinhas.splice(0, 3);
    }
    mercado_.produtos.mercearia[2].farinhas.push({
      id: generateId(mercado_.produtos.mercearia[2].farinhas),
      nome,
      valor,
    });
    const farinhas = mercado_.produtos.mercearia[2].farinhas;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às farinhas do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      farinhas,
    });
  }
);
app.get(
  "/mercado/:id/produtos/mercearia/farinhas",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de farinhas do mercearia do mercado especificado
    const farinhas = mercado_.produtos.mercearia[2].farinhas;
    if (!farinhas || farinhas.length === 0) {
      return res.status(404).send({
        message: "Não há farinhas cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de farinhas do mercado ${mercado_.nome}`,
      farinhas,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/mercearia/farinhas/:farinhasId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("farinhasId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do mercearia do mercado especificado
    const farinhas = mercado_.produtos.mercearia[2].farinhas;
    if (!farinhas || farinhas.length === 0) {
      return res.status(404).send({
        message: "Não há farinhas cadastradas neste mercado.",
      });
    }
    const index = farinhas.findIndex(
      (m) => m.id === parseInt(req.params.farinhasId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send({
      message: `${farinhas[0].nome} com ID ${req.params.farinhasId} foi removido com sucesso.`,
    });
    farinhas.splice(index, 1);
  }
);
// conservados emlatados

app.post(
  "/mercado/:id/produtos/mercearia/conservadosEnlatados",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de conservadosEnlatados do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name =
      mercado_.produtos.mercearia[3].conservados_enlatados.find(
        (c) =>
          c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
      );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de conservadosEnlatados.`,
      });
    }
    if (mercado_.produtos.mercearia[3].conservados_enlatados.length > 9) {
      mercado_.produtos.mercearia[3].conservados_enlatados.splice(0, 3);
    }
    mercado_.produtos.mercearia[3].conservados_enlatados.push({
      id: generateId(mercado_.produtos.mercearia[3].conservados_enlatados),
      nome,
      valor,
    });
    const conservados_enlatados =
      mercado_.produtos.mercearia[3].conservados_enlatados;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às conservados_enlatados do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      conservados_enlatados,
    });
  }
);
app.get(
  "/mercado/:id/produtos/mercearia/conservadosEnlatados",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de conservadosEnlatados do mercearia do mercado especificado
    const conservadosEnlatados =
      mercado_.produtos.mercearia[3].conservados_enlatados;
    if (!conservadosEnlatados || conservadosEnlatados.length === 0) {
      return res.status(404).send({
        message: "Não há conservadosEnlatados cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de conservadosEnlatados do mercado ${mercado_.nome}`,
      conservadosEnlatados,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/mercearia/conservadosEnlatados/:conservadosEnlatadosId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("conservadosEnlatadosId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do mercearia do mercado especificado
    const conservadosEnlatados =
      mercado_.produtos.mercearia[3].conservados_enlatados;
    if (!conservadosEnlatados || conservadosEnlatados.length === 0) {
      return res.status(404).send({
        message: "Não há conservadosEnlatados cadastradas neste mercado.",
      });
    }
    const index = conservadosEnlatados.findIndex(
      (m) => m.id === parseInt(req.params.conservadosEnlatadosId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send({
      message: `${conservadosEnlatados[0].nome} com ID ${req.params.conservadosEnlatadosId} foi removido com sucesso.`,
    });
    conservadosEnlatados.splice(index, 1);
  }
);
// merc oleos
app.post(
  "/mercado/:id/produtos/mercearia/oleos",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de oleos do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.mercearia[4].oleos.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de oleos.`,
      });
    }
    if (mercado_.produtos.mercearia[4].oleos.length > 9) {
      mercado_.produtos.mercearia[4].oleos.splice(0, 3);
    }
    mercado_.produtos.mercearia[4].oleos.push({
      id: generateId(mercado_.produtos.mercearia[4].oleos),
      nome,
      valor,
    });
    const oleos = mercado_.produtos.mercearia[4].oleos;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às oleos do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      oleos,
    });
  }
);
app.get(
  "/mercado/:id/produtos/mercearia/oleos",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de oleos do mercearia do mercado especificado
    const oleos = mercado_.produtos.mercearia[4].oleos;
    if (!oleos || oleos.length === 0) {
      return res.status(404).send({
        message: "Não há oleos cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de oleos do mercado ${mercado_.nome}`,
      oleos,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/mercearia/oleos/:oleosId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("oleosId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do mercearia do mercado especificado
    const oleos = mercado_.produtos.mercearia[4].oleos;
    if (!oleos || oleos.length === 0) {
      return res.status(404).send({
        message: "Não há oleos cadastradas neste mercado.",
      });
    }
    const index = oleos.findIndex((m) => m.id === parseInt(req.params.oleosId));
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send({
      message: `${oleos[0].nome} com ID ${req.params.oleosId} foi removido com sucesso.`,
    });
    oleos.splice(index, 1);
  }
);
// merce temperos condimentos
app.post(
  "/mercado/:id/produtos/mercearia/temperosCondimentos",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de oleos do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name =
      mercado_.produtos.mercearia[5].temperos_condimentos.find(
        (c) =>
          c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
      );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de temperosCondimentos.`,
      });
    }
    if (mercado_.produtos.mercearia[5].temperos_condimentos.length > 9) {
      mercado_.produtos.mercearia[5].temperos_condimentos.splice(0, 3);
    }
    mercado_.produtos.mercearia[5].temperos_condimentos.push({
      id: generateId(mercado_.produtos.mercearia[5].temperos_condimentos),
      nome,
      valor,
    });
    const temperosCondimentos =
      mercado_.produtos.mercearia[5].temperos_condimentos;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às temperosCondimentos do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      temperosCondimentos,
    });
  }
);
app.get(
  "/mercado/:id/produtos/mercearia/temperosCondimentos",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de temperosCondimentos do mercearia do mercado especificado
    const temperosCondimentos =
      mercado_.produtos.mercearia[5].temperos_condimentos;
    if (!temperosCondimentos || temperosCondimentos.length === 0) {
      return res.status(404).send({
        message: "Não há temperosCondimentos cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de temperosCondimentos do mercado ${mercado_.nome}`,
      temperosCondimentos,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/mercearia/temperosCondimentos/:temperosCondimentosId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("temperosCondimentosId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do mercearia do mercado especificado
    const temperosCondimentos =
      mercado_.produtos.mercearia[5].temperos_condimentos;
    if (!temperosCondimentos || temperosCondimentos.length === 0) {
      return res.status(404).send({
        message: "Não há temperosCondimentos cadastradas neste mercado.",
      });
    }
    const index = temperosCondimentos.findIndex(
      (m) => m.id === parseInt(req.params.temperosCondimentosId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send({
      message: `${temperosCondimentos[0].nome} com ID ${req.params.temperosCondimentosId} foi removido com sucesso.`,
    });
    temperosCondimentos.splice(index, 1);
  }
);

// bebidas com alcool
app.post(
  "/mercado/:id/produtos/bebidas/comAlcool",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de oleos do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.bebidas[0].com_alcool.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de comAlcool.`,
      });
    }
    if (mercado_.produtos.bebidas[0].com_alcool.length > 9) {
      mercado_.produtos.bebidas[0].com_alcool.splice(0, 3);
    }
    mercado_.produtos.bebidas[0].com_alcool.push({
      id: generateId(mercado_.produtos.bebidas[0].com_alcool),
      nome,
      valor,
    });
    const comAlcool = mercado_.produtos.bebidas[0].com_alcool;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às comAlcool do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      comAlcool,
    });
  }
);
app.get(
  "/mercado/:id/produtos/bebidas/comAlcool",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de comAlcool do bebidas do mercado especificado
    const comAlcool = mercado_.produtos.bebidas[0].com_alcool;
    if (!comAlcool || comAlcool.length === 0) {
      return res.status(404).send({
        message: "Não há comAlcool cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de bebidas sem alcool do mercado ${mercado_.nome}`,
      comAlcool,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/bebidas/comAlcool/:comAlcoolId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("comAlcoolId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do bebidas do mercado especificado
    const comAlcool = mercado_.produtos.bebidas[0].com_alcool;
    if (!comAlcool || comAlcool.length === 0) {
      return res.status(404).send({
        message: "Não há comAlcool cadastradas neste mercado.",
      });
    }
    const index = comAlcool.findIndex(
      (m) => m.id === parseInt(req.params.comAlcoolId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send({
      message: `${comAlcool[0].nome} com ID ${req.params.comAlcoolId} foi removido com sucesso.`,
    });
    comAlcool.splice(index, 1);
  }
);

// bebiidas sem alcool
app.post(
  "/mercado/:id/produtos/bebidas/semAlcool",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de oleos do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.bebidas[1].sem_alcool.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de semAlcool.`,
      });
    }
    if (mercado_.produtos.bebidas[1].sem_alcool.length > 9) {
      mercado_.produtos.bebidas[1].sem_alcool.splice(0, 3);
    }
    mercado_.produtos.bebidas[1].sem_alcool.push({
      id: generateId(mercado_.produtos.bebidas[1].sem_alcool),
      nome,
      valor,
    });
    const semAlcool = mercado_.produtos.bebidas[1].sem_alcool;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às semAlcool do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      semAlcool,
    });
  }
);
app.get(
  "/mercado/:id/produtos/bebidas/semAlcool",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de semAlcool do bebidas do mercado especificado
    const semAlcool = mercado_.produtos.bebidas[1].sem_alcool;
    if (!semAlcool || semAlcool.length === 0) {
      return res.status(404).send({
        message: "Não há semAlcool cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de bebidas sem alcool do mercado ${mercado_.nome}`,
      semAlcool,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/bebidas/semAlcool/:semAlcoolId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("semAlcoolId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do bebidas do mercado especificado
    const semAlcool = mercado_.produtos.bebidas[1].sem_alcool;
    if (!semAlcool || semAlcool.length === 0) {
      return res.status(404).send({
        message: "Não há semAlcool cadastradas neste mercado.",
      });
    }
    const index = semAlcool.findIndex(
      (m) => m.id === parseInt(req.params.semAlcoolId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send({
      message: `${semAlcool[0].nome} com ID ${req.params.semAlcoolId} foi removido com sucesso.`,
    });
    semAlcool.splice(index, 1);
  }
);

//  higiene e limpeza

app.post(
  "/mercado/:id/produtos/higienelimpeza/higiene",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de higiene do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.higienelimpeza[0].higiene.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de higiene.`,
      });
    }
    if (mercado_.produtos.higienelimpeza[0].higiene.length > 9) {
      mercado_.produtos.higienelimpeza[0].higiene.splice(0, 3);
    }
    mercado_.produtos.higienelimpeza[0].higiene.push({
      id: generateId(mercado_.produtos.higienelimpeza[0].higiene),
      nome,
      valor,
    });
    const higiene = mercado_.produtos.higienelimpeza[0].higiene;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às higiene do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      higiene,
    });
  }
);
app.get(
  "/mercado/:id/produtos/higienelimpeza/higiene",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de higiene do higienelimpeza do mercado especificado
    const higiene = mercado_.produtos.higienelimpeza[0].higiene;
    if (!higiene || higiene.length === 0) {
      return res.status(404).send({
        message: "Não há higiene cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de higiene do mercado ${mercado_.nome}`,
      higiene,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/higienelimpeza/higiene/:higieneId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("higieneId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do higienelimpeza do mercado especificado
    const higiene = mercado_.produtos.higienelimpeza[0].higiene;
    if (!higiene || higiene.length === 0) {
      return res.status(404).send({
        message: "Não há higiene cadastradas neste mercado.",
      });
    }
    const index = higiene.findIndex(
      (m) => m.id === parseInt(req.params.higieneId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send({
      message: `${higiene[0].nome} com ID ${req.params.higieneId} foi removido com sucesso.`,
    });
    higiene.splice(index, 1);
  }
);
// limpeza

app.post(
  "/mercado/:id/produtos/higienelimpeza/limpeza",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    body("nome").not().isEmpty().withMessage("Nome é obrigatório"),
    body("valor")
      .isInt({ min: 1 })
      .withMessage("Valor deve ser um número inteiro e não negativo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }
    // Adicionando o novo produto na categoria de limpeza do acougue do mercado especificado
    const { nome, valor } = req.body;

    const verify_name = mercado_.produtos.higienelimpeza[1].limpeza.find(
      (c) => c.nome.trim().toLowerCase() === req.body.nome.trim().toLowerCase()
    );
    if (verify_name) {
      return res.status(400).send({
        message: `O nome ${req.body.nome} já exista na lista de higiene.`,
      });
    }
    if (mercado_.produtos.higienelimpeza[1].limpeza.length > 9) {
      mercado_.produtos.higienelimpeza[1].limpeza.splice(0, 3);
    }
    mercado_.produtos.higienelimpeza[1].limpeza.push({
      id: generateId(mercado_.produtos.higienelimpeza[1].limpeza),
      nome,
      valor,
    });
    const limpeza = mercado_.produtos.higienelimpeza[1].limpeza;
    res.status(201).send({
      message: `Produto ${nome} adicionado com sucesso às limpeza do mercado ${mercado_.nome} com valor R$ ${valor}.`,
      limpeza,
    });
  }
);
app.get(
  "/mercado/:id/produtos/higienelimpeza/limpeza",
  [param("id").isInt().withMessage("ID do mercado deve ser um número inteiro")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de higiene do higienelimpeza do mercado especificado
    const limpeza = mercado_.produtos.higienelimpeza[1].limpeza;
    if (!limpeza || limpeza.length === 0) {
      return res.status(404).send({
        message: "Não há limpeza cadastradas neste mercado.",
      });
    }

    res.status(200).send({
      message: `Lista de limpeza do mercado ${mercado_.nome}`,
      limpeza,
    });
  }
);
app.delete(
  "/mercado/:id/produtos/higienelimpeza/limpeza/:limpezaId",
  [
    param("id").isInt().withMessage("ID do mercado deve ser um número inteiro"),
    param("limpezaId")
      .isInt()
      .withMessage("ID do mercado deve ser um número inteiro"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encontrando o mercado com o ID fornecido
    const mercado_ = mercado.find((m) => m.id === parseInt(req.params.id));
    if (!mercado_) {
      return res.status(404).send("Mercado não encontrado.");
    }

    // Recuperando a lista de queijo do limpezalimpeza do mercado especificado
    const limpeza = mercado_.produtos.higienelimpeza[1].limpeza;
    if (!limpeza || limpeza.length === 0) {
      return res.status(404).send({
        message: "Não há higiene cadastradas neste mercado.",
      });
    }
    const index = limpeza.findIndex(
      (m) => m.id === parseInt(req.params.limpezaId)
    );
    if (index === -1) {
      return res
        .status(404)
        .send("O mercado com o ID fornecido não foi encontrado.");
    }
    res.send({
      message: `${limpeza[0].nome} com ID ${req.params.limpezaId} foi removido com sucesso.`,
    });
    limpeza.splice(index, 1);
  }
);
// EVENTOS
app.get("/eventos", (req, res) => {
  res.send(eventos);
});
const isFutureDate = (date) => {
  const today = new Date();
  const inputDate = new Date(date);
  return inputDate >= today.setHours(0, 0, 0, 0);
};
app.post(
  "/eventos",
  [
    body("nome")
      .trim()
      .custom((value) => {
        const eventoExistente = eventos.some(
          (evento) =>
            evento.nome.trim().toLowerCase() === value.trim().toLowerCase()
        );
        if (eventoExistente) {
          throw new Error("O nome do evento já existe");
        }
        return true;
      }),
    body("data")
      .isISO8601()
      .withMessage("A data deve estar no formato ISO8601 (AAAA-MM-DD)")
      .custom((value) => {
        if (!isFutureDate(value)) {
          throw new Error("A data deve ser do dia atual ou futura");
        }
        return true;
      }),
    body("local")
      .trim()
      .custom((value, { req }) => {
        const eventoNoLocal = eventos.some(
          (evento) =>
            evento.local.trim().toLowerCase() === value.trim().toLowerCase() &&
            evento.data === req.body.data
        );
        if (eventoNoLocal) {
          throw new Error("Já existe um evento no local na mesma data");
        }
        return true;
      }),
    body("capacidade")
      .isInt({ gt: 5, max: 50 })
      .withMessage(
        "A capacidade deve ser um número inteiro maior que 5 e menor que 50"
      ),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, data, local, capacidade } = req.body;

    const novoEvento = {
      id: generateId(eventos),
      nome,
      data,
      local,
      capacidade,
      participantes: [],
    };

    if (eventos.length > 50) {
      eventos.splice(0, 10);
    }
    eventos.push(novoEvento);
    res.status(201).json(novoEvento);
  }
);

app.get(
  "/eventos/:id",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("O ID deve ser um número inteiro positivo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventoId = parseInt(req.params.id, 10);
    const evento = eventos.find((evento) => evento.id === eventoId);

    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    res.json(evento);
  }
);

// Rota para deletar um evento por ID
app.delete(
  "/eventos/:id",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("O ID deve ser um número inteiro positivo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventoId = parseInt(req.params.id, 10);
    const eventoIndex = eventos.findIndex((evento) => evento.id === eventoId);

    if (eventoIndex === -1) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    res.status(204).send({ message: "Evento finalizado." });
    eventos.splice(eventoIndex, 1);
  }
);

app.put(
  "/eventos/:id",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("O ID deve ser um número inteiro positivo"),
    body("nome").custom((value, { req }) => {
      const eventoExistente = eventos.some(
        (evento) =>
          evento.nome.trim().toLowerCase() === value.trim().toLowerCase() &&
          evento.id !== parseInt(req.params.id, 10)
      );
      if (eventoExistente) {
        throw new Error("O nome do evento já existe");
      }
      return true;
    }),
    body("data")
      .isISO8601()
      .withMessage("A data deve estar no formato ISO8601 (AAAA-MM-DD)")
      .custom((value) => {
        const isFutureDate = (date) => {
          const today = new Date();
          const inputDate = new Date(date);
          return inputDate >= today.setHours(0, 0, 0, 0);
        };

        if (!isFutureDate(value)) {
          throw new Error("A data deve ser do dia atual ou futura");
        }
        return true;
      }),
    body("local").custom((value, { req }) => {
      const eventoNoLocal = eventos.some(
        (evento) =>
          evento.local.trim().toLowerCase() === value.trim().toLowerCase() &&
          evento.data === req.body.data &&
          evento.id !== parseInt(req.params.id, 10)
      );
      if (eventoNoLocal) {
        throw new Error("Já existe um evento no local na mesma data");
      }
      return true;
    }),
    body("capacidade")
      .isInt({ gt: 5, max: 50 })
      .withMessage(
        "A capacidade deve ser um número inteiro maior que 5 e menor que 50"
      ),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventoId = parseInt(req.params.id, 10);
    const eventoIndex = eventos.findIndex((evento) => evento.id === eventoId);

    if (eventoIndex === -1) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    const { nome, data, local, capacidade } = req.body;

    eventos[eventoIndex] = { id: eventoId, nome, data, local, capacidade };

    res.status(201).json(eventos[eventoIndex]);
  }
);

// PARTICIPANTES
app.get(
  "/eventos/:id/participantes",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("O ID do evento deve ser um número inteiro positivo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventoId = parseInt(req.params.id, 10);
    const evento = eventos.find((evento) => evento.id === eventoId);

    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    res.json(evento.participantes);
  }
);
app.post(
  "/eventos/:id/participantes",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("O ID do evento deve ser um número inteiro positivo"),
    body("nome").trim().notEmpty().withMessage("O nome é obrigatório"),
    body("email").isEmail().withMessage("Email inválido").optional(),
    body("idade")
      .isInt({ gt: 12 })
      .withMessage("A idade deve ser maior que 12"),
    body("nome").custom((value, { req }) => {
      const eventoId = parseInt(req.params.id, 10);
      const evento = eventos.find((evento) => evento.id === eventoId);

      if (!evento) {
        throw new Error("Evento não encontrado");
      }

      const participanteExistente = eventos.some(
        (evento) =>
          evento.data === evento.data &&
          evento.participantes.some(
            (participante) =>
              participante.nome.trim().toLowerCase() ===
              value.trim().toLowerCase()
          )
      );

      if (participanteExistente) {
        throw new Error(
          "Já existe um participante com o mesmo nome em um evento na mesma data"
        );
      }

      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventoId = parseInt(req.params.id, 10);
    const evento = eventos.find((evento) => evento.id === eventoId);

    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    const { nome, email, idade } = req.body;
    const novoParticipante = {
      id: evento.participantes.length + 1,
      nome,
      email,
      idade,
    };

    if (email) {
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
              <h1>Você é novo(a) escrito(a) no Evento</h1>
          </div>
          <div class="content">
              <h2>Detalhes do Evento</h2>
              <p><strong>Nome:</strong>  ${evento.nome}</p>
              <p><strong>Local:</strong>  ${evento.local}</p>
              <p><strong>Data:</strong>  ${evento.data}</p>
              <p><strong>Capacidade:</strong>  ${evento.capacidade} participantes</p>
          </div>
          <div class="footer">
              Obrigado por participar!.
          </div>
      </div>
      </body>
      </html>
       `;
      enviarEmail(
        email,
        `Evento * ${evento.nome} * Parabéns senhor(a): ${
          nome || "Participante"
        } pela adesão ao Evento`,
        html
      );
    }

    evento.capacidade -= 1;

    if (evento.capacidade < 0) {
      return res
        .status(400)
        .send({ message: "O Evento não suporta mais participantes." });
    }
    evento.participantes.push(novoParticipante);
    res.status(201).json(novoParticipante);
  }
);
app.delete(
  "/eventos/:id/participantes/:participanteId",
  [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("O ID do evento deve ser um número inteiro positivo"),
    param("participanteId")
      .isInt({ gt: 0 })
      .withMessage("O ID do participante deve ser um número inteiro positivo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventoId = parseInt(req.params.id, 10);
    const participanteId = parseInt(req.params.participanteId, 10);
    const evento = eventos.find((evento) => evento.id === eventoId);

    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    const participanteIndex = evento.participantes.findIndex(
      (participante) => participante.id === participanteId
    );

    if (participanteIndex === -1) {
      return res.status(404).json({ message: "Participante não encontrado" });
    }
    evento.capacidade += 1;

    res.status(204).send({ message: "Participante excluído." });
    evento.participantes.splice(participanteIndex, 1);

  }
);
//

app.get("/", (req, res) => {
  res.send("API OK");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {});
