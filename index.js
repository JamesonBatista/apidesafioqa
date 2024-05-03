import swaggerDocument from "./swaggerConfig.js";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { body, validationResult } from "express-validator";
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
function generateId() {
  const maxId =
    crud_get.users.length > 0
      ? Math.max(...crud_get.users.map((user) => user.id))
      : 0;
  return maxId + 1;
}
app.post(
  "/crud-post",
  [
    body("nome")
      .notEmpty().withMessage("O campo nome é obrigatório")
      .custom((value) => {
        const userExists = crud_get.users.some(user => user.nome === value);
        if (userExists) {
          throw new Error('Nome já existe');
        }
        return true;
      }),
    body("email")
      .isEmail().withMessage("Deve ser um email válido")
      .notEmpty().withMessage("O campo email é obrigatório"),
    body("idade")
      .isInt({ min: 1 }).withMessage("A idade deve ser um número inteiro válido")
      .notEmpty().withMessage("O campo idade é obrigatório"),
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
      id: generateId(),
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

    crud_get.users.push(newUser);
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
    crud_get.users = crud_get.users.filter(user => user.id !== id);

    if (crud_get.users.length === originalLength) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(crud_get.users);
});

app.get("/", (req, res) => {
  res.send("API OK");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {});
