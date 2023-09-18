require("dotenv").config();

const express = require("express");
const {connect, exec, table} = require("./database");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {

    const filter = req.params.id;
    const result = await exec(` select * from dbo.ZBX010 where ZBX_CHVINT = '${filter}' `);

    res.json(result.recordset).status(200);

  } catch (error) {

    res.status(400).json({ erro: error });

  }
});

module.exports = router;
