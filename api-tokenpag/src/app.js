
const express = require("express");
const database = require("./database");
const routes = require("./routes");


const app = express();
const port = 3005;

app.use(express.json());
app.use(routes);


database.connect().then(() => {
  app.listen(port, () => console.log("Servidor rodando na porta", port));
});
