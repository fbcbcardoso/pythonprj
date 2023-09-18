require("dotenv").config();

const express = require("express");
const { exec, tableTkn, p_Proc_const } = require("./database");
const bodyValidate = require("./utils/bodyValidate.js");
const criacaoValidate = require("./utils/validateCriacao.js");

const router = express.Router(); 

router.get("/:id", async (req, res, next) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, X-Request-With, X-Requested-By"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Max-Age", "86400");
    res.setHeader("Cache-Control", "max-age=3600");
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    const cfields = req.params.id;
    //const result = await exec(`execute Proc_API_Get_TokenCnab '${cfields}' `);
    const result = await exec(` SELECT * FROM ZBP010 WHERE ZBP_CHAVE= '1ZWG0000000000484014' `);
    
    
    const jdados = result.recordset;
    
    res.status(200).json(jdados);

  } catch (error) {
    res.status(400).json({ erro: error });
  }
});

module.exports = router;
