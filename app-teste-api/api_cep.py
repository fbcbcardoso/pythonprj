import requests
import json

def buscar_dados_id(id):
  #  request = requests.get(f"http://localhost:3002/api/todo?id={id}") 
    request = requests.get(f"https://viacep.com.br/ws/{id}/json/") 

    todo = json.loads(request.content)
    print(todo)
    print(todo['logradouro'])

if __name__ == '__main__':
    # buscar_dados()
    buscar_dados_id("04616002")