from flask import Flask, jsonify, request

app = Flask(__name__)

dados = [

    {
        'id':1,
        'metrica':'Alertas de sites e app mobiles',
        'nivel':'Grave'
    },
    
    {
        'id':2,
        'metrica':'Alertas Servidores',
        'nivel':'Critico'
    },
    
]

# consulta toda base
@app.route('/dados', methods=['GET'])
def obter_dados():
    return jsonify(dados)

#consulta por ID 
@app.route('/dados/<int:id>', methods=['GET'])
def obter_dados_id(id):
    for lista in dados:
        if lista.get('id') == id:
            return jsonify(lista)

app.run(port=3500,host='localhost',debug=True)