require("dotenv").config();

const express = require("express");
const { exec, table, tableTransitoria } = require("./database");
const bodyValidate = require("./utils/bodyValidate.js");
const criacaoValidate = require("./utils/validateCriacao.js");
const transitoriaValidate = require("./utils/validateTransitoria");
const transitoriaV2Validate = require("./utils/validateTransitoriaV2.js");
const auth = require("./middlewares/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/cr/:id", auth, async (req, res) => {
  try {
    const custo = req.params.id;
    const result = await exec(`execute Proc_API_Get_Centro_Custo '${custo}' `);

    res.json(result.recordset).status(200);
  } catch (error) {
    res.status(400).json({ erro: error });
  }
});

router.post("/register", auth, async (req, res) => {
  try {
    const { user, password } = req.body;
    // var hashedPassword = bcrypt.hashSync(password) // caso queira salvar a senha com hash no banco
    const query = `INSERT INTO ${tableTransitoria}[API_CENTRO_USERS](USUARIO, SENHA) VALUES ('${user}','${password}')`;
    await exec(query);
    res
      .send({
        message: "Usuário criado com sucesso!",
        usuarioCriado: user,
      })
      .status(200);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/auth", async (req, res, next) => {
  try {
    const { user, password } = req.body;
    const query = `SELECT * FROM ${tableTransitoria}[API_CENTRO_USERS] WHERE USUARIO = '${user}'`;
    const { recordset: results } = await exec(query);
    const { SENHA, ID_USERS } = results[0];
    const data = await bcrypt.compare(password, SENHA);
    const token = `${generateToken({ userId: ID_USERS })}`;
    res.status(200).send({ message: "Autenticado com sucesso!", token: token });
  } catch (error) {
    res.status(401).send({ message: "Falha na autenticação", error: error });
  }
});

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: 180,
  });
}

router.post("/addCr", auth, async (req, res) => {
  try {
    const { error, message, data } = bodyValidate(req.body);
    if (error) {
      return res.status(400).json(message);
    }
    const colums = data.join(",");
    const fields = Object.values(req.body)
      .map((f) => (f = `'${f.toString().replace(/\,/g, ".")}'`))
      .join(", ");
    const query = `INSERT INTO ${table}(R_E_C_N_O_,${colums}) VALUES ((SELECT CASE WHEN MAX(R_E_C_N_O_) IS NULL THEN 1 ELSE MAX(R_E_C_N_O_) + 1 END FROM CTT010), ${fields})`;
    await exec(query);
    res.send(fields).status(200);
  } catch (error) {
    res.status(400).json({ erro: error });
  }
});

router.post("/addTransitoria", auth, async (req, res) => {
  try {
    const { error, message, data } = transitoriaValidate(req.body);
    if (error) {
      return res.status(400).json(message);
    }
    const colums = data.join(",");
    const fields = Object.values(req.body)
      .map((f) => (f = `'${f.toString().replace(/\,/g, ".")}'`))
      .join(", ");
    const query = `INSERT INTO ${tableTransitoria}[CDC_TRANSITORIA](${colums}) VALUES (${fields})`;
    await exec(query);
    res.send(fields).status(200);
  } catch (error) {
    res.status(400).json({ erro: error });
  }
});

router.post("/addTransitoriaCriacao", auth, async (req, res) => {
  try {
    const { error, message, data } = criacaoValidate(req.body);
    if (error) {
      return res.status(400).json(message);
    }
    const colums = data.join(",");
    const fields = Object.values(req.body)
      .map((f) => (f = `'${f.toString().replace(/\,/g, ".")}'`))
      .join(", ");
    const query = `INSERT INTO ${tableTransitoria}[CDC_TRANSITORIA_CRIACAO_CR](${colums}) VALUES (${fields})`;
    await exec(query);
    res.send(fields).status(200);
  } catch (error) {
    res.status(400).json({ erro: error });
  }
});

router.post("/addTransitoriaV2", auth, async (req, res) => {
  try {
    const { error, message, data } = transitoriaV2Validate(req.body);
    if (error) {
      return res.status(400).json(message);
    }
    const colums = data.join(",");
    const fields = Object.values(req.body)
      .map((f) => (f = `'${f.toString().replace(/\,/g, ".")}'`))
      .join(", ");
    const query = `INSERT INTO ${tableTransitoria}[CDC_TRANSITORIAV2](${colums}) VALUES (${fields})`;

    await exec(query);
    res.send(fields).status(200);
  } catch (error) {
    res.status(400).json({ erro: error });
  }
});

router.patch("/updateCr/:id", auth, async (req, res) => {
  try {
    const campos = req.body;
    const custo = req.params.id;
    let query = `UPDATE ${table} SET`;
    Object.keys(campos).map((key) => (query += ` ${key}='${campos[key]}',`));
    query = query.replace(/.$/, "");
    query += ` WHERE ( CTT_CUSTO = '${custo}' OR CTT_RES = '${custo}' )`;

    await exec(query);
    res.send({ message: "Alterado com sucesso!" }).status(200);
  } catch (error) {
    res.status(400).json({ erro: error });
  }
});

module.exports = router;
