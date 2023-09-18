const requiredFields = require("./requiredCriacao.json");

module.exports = (body) => {
  const missing = [];
  requiredFields.forEach((field) => {
    if (!body.hasOwnProperty(field)) {
      missing.push(field);
    }
  }); 
  if (missing.length) {
    return {
      error: true,
      message: `Esses campos são obrigatórios ${missing.join(" ,")}`,
    };
  }
  return {
    data: Object.keys(body),
    error: false,
  };
};
