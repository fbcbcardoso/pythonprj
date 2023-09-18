const sql = require("mssql/msnodesqlv8");
require("dotenv").config();

function connect() {
  const { user, password, server, database } = process.env;
  return new Promise((resolve, reject) => {
    new sql.connect({ user, password, server, database })
      .then((connection) => {
        global.connection = connection;
        resolve();
      })
      .catch(reject);
  });
}

function exec(sqlQry) {
  return new Promise((resolve, reject) => {
    global.connection.request().query(sqlQry).then(resolve).catch(reject);
  });
}

const table = "dbo.CTT010";

const tableTransitoria = "[GPSDBI01].[dbo]."

module.exports = { connect, exec, table, tableTransitoria };
