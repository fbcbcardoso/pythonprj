const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).send({ error: "Token não encontrado" });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, async (err, user) => {
      if (err) {
        return res.status(401).send({ mensagem: "Falha na autenticação" });
      }
      req.user = user;
      return next();
    });
  } catch (error) {
    return res.status(401).send({ mensagem: "Falha na autenticação" });
  }
};
