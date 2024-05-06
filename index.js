import swaggerDocument from "./swaggerConfig.js";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { body, validationResult } from "express-validator";
import isValidCPF, { decrypt, encrypt } from "./functions.js";

import enviarEmail from "./email.js";
const app = express();
import bodyParser from "body-parser";
import Joi from "joi";
import jwt from "jsonwebtoken";
import germany_json, { productsGamers } from "./swagger_jsons.js";
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

    const { id_cliente, id_produto, code_emprestimo, receber_email } = req.body;

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
  "/create-projects",
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("O nome é obrigatório")
      .isString()
      .withMessage("O campo name é uma string"),
    body("leader")
      .not()
      .isEmail()
      .withMessage("Campo líder é obrigatório")
      .isString()
      .withMessage("O campo leader é uma string"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("A descrição é obrigatória")
      .isString()
      .withMessage("O campo description é uma string"),
    body("endDate")
      .isISO8601()
      .withMessage("Data de término inválida")
      .custom((value, { req }) => {
        const endDate = new Date(value);
        const today = new Date();
        if (endDate <= today) {
          throw new Error("A data de término deve ser maior que a data atual");
        }
        return true;
      }),
    body("members").isArray().withMessage("Membros devem ser um array"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, endDate, members, leader } = req.body;

    // Definindo startDate para a data atual
    const startDate = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

    // Criar um novo projeto com ID único
    const newProject = {
      id: generateId(projects), // Gerar um ID simples baseado no tamanho do array
      name,
      leader,
      description,
      startDate,
      endDate,
      members,
    };
    if (projects.length >= 50) {
      projects = projects.slice(10);
    }
    const project = projects.find((p) => p.name.trim() === name.trim());
    if (project) {
      return res
        .status(400)
        .json({ errors: `${name} já existe na lista de projetos.` });
    }

    // Adicionar o projeto à lista de projetos
    projects.push(newProject);

    // Responder com sucesso
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
app.delete("/delete-projects/:id", (req, res) => {
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
  "/add-member",
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

    const { name, office, projectId, send_email } = req.body;

    // Encontrar o projeto pelo ID
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }

    let id_member = generateId(membersProjet);
    // Criar o novo membro
    const newMember = { id_member, name, office, send_email };
    if (membersProjet.length >= 50) {
      membersProjet = membersProjet.slice(10);
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
app.delete("/delete-member/:projectId/:memberName", (req, res) => {
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
  "/new-client",
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

    const { id_client, id_product, send_email } = req.body;
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
          `Parabéns ${client.name} você adquiriu ${product.name}}`,
          html
        );
      }
    } else {
      res.status(400).json({
        message: "Crédito insuficiente",
        requiredCredit: product.price,
        currentCredit: client.card.crdit,
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
      .withMessage("O valor de crédito solicitado deve ser um número positivo"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id_client, id_product, value_credit } = req.body;
    const client = clients.find((c) => c.id === id_client);
    const product = productsGamers().find((p) => p.id === id_product);

    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const creditNeeded = product.price - client.card.credit;

    if (client.card.credit >= product.price) {
      return res.status(400).json({
        message: "Crédito atual já é suficiente para comprar o produto",
      });
    }

    const value_sum = (client.card.credit += value_credit);
    if (product.price > value_sum) {
      res.status(400).json({
        message: `O valor do produto ${product.price} ainda é maior que o crédito atual somado ao emprestimo ${value_sum}, ${client.name} faça um novo emprestimo`,
      });
    }

    client.card.credit += value_credit;
    res.status(200).json({
      message: "Crédito adicionado com sucesso",
      newCredit: client.card.credit,
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
  const  {crypto}  = req.body;
  // Descriptografar os dados recebidos
  const decryptedData = decrypt(crypto);

  // Verificar a existência dos IDs
  const dataValidation = {
    id_product: loja.produtos.some((p) => p.id === decryptedData.id_product),
    id_financiamento_produtos: produtosDeLuxo.produtosDeLuxo.some(
      (f) => f.id === decryptedData.id_financiamento_produtos
    ),
    id_projetos: projects.some((p) => p.id === decryptedData.id_projetos),
    id_product_gamers: productsGamers().some(
      (p) => p.id === decryptedData.id_product_gamers
    ),
  };

  // Organizar os dados para resposta
  const responseData = {
    id_product: dataValidation.id_product
      ? `Produto ${decryptedData.id_product} encontrado.`
      : `Produto ${decryptedData.id_product} não encontrado.`,
    id_financiamento_produtos: dataValidation.id_financiamento_produtos
      ? `Financiamento ${decryptedData.id_financiamento_produtos} encontrado.`
      : `Financiamento ${decryptedData.id_financiamento_produtos} não encontrado.`,
    id_projetos: dataValidation.id_projetos
      ? `Projeto ${decryptedData.id_projetos} encontrado.`
      : `Projeto ${decryptedData.id_projetos} não encontrado.`,
    id_product_gamers: dataValidation.id_product_gamers
      ? `Produto Gamer ${decryptedData.id_product_gamers} encontrado.`
      : `Produto Gamer ${decryptedData.id_product_gamers} não encontrado.`,
  };

  res.json(responseData);
});

//
app.get("/", (req, res) => {
  res.send("API OK");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {});
