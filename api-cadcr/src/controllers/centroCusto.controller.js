const centroCusto = require();

module.exports = {
    async get(req, res){
        const resposta = await centroCusto.get(req.query);
        return res.status(resposta.status).send(resposta.dados);
    }
}