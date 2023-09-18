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

const tableTkn = "dbo.ZBP010";

const p_Proc_const = "Proc_API_Get_TokenCnab";

module.exports = { connect, exec, tableTkn, p_Proc_const };
