const swaggerUI = require ("swagger-ui-express");
const swaggerDocument = require ("./swagger.json")

const express = require("express");
const database = require("./database");
const routes = require("./routes");


const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

database.connect().then(() => {
  app.listen(port, () => console.log("Servidor rodando na porta", port));
});
