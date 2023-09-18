import requests
import json
import time
from flask import Flask, jsonify, request
from pyzabbix import ZabbixMetric, ZabbixSender

# Configurações do New Relic
api_key = 'NRAK-UOQTC5C5QMKZ5KBSB6ECDTV8HLV'
application_id = '3736439'
metric_name = 'NOME_DA_MÉTRICA_AQUI'
metric_units = 'UNIDADES_DA_MÉTRICA_AQUI'

# Configurações do Zabbix
zabbix_server = 'SEU_IP_DO_ZABBIX_SERVER_AQUI'
zabbix_host = 'NOME_DO_HOST_NO_ZABBIX_AQUI'

# Configurações do intervalo de atualização
interval_seconds = 60

# URL da API do New Relic para recuperar as métricas desejadas
url = 'https://api.newrelic.com/v2/applications/{0}/metrics/data.json'.format(application_id)

# Configuração do cabeçalho HTTP para a API do New Relic
headers = {
    'X-Api-Key': api_key,
    'Content-Type': 'application/json'
}

while True:
    try:
        # Recupera as métricas desejadas da API do New Relic
        payload = {
            "names": [metric_name],
            "values": metric_units,
            "summarize": "true",
            "from": int(time.time()) - interval_seconds,
            "to": int(time.time())
        }
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        data = json.loads(response.content.decode('utf-8'))

        # Extrai o valor da métrica dos dados de resposta do New Relic
        metric_value = data['metric_data']['metrics'][0]['timeslices'][0]['values'][metric_name]

        # Envia a métrica para o Zabbix
        sender = ZabbixSender(zabbix_server)
        metric = ZabbixMetric(zabbix_host, metric_name, metric_value)
        sender.send([metric])

    except Exception as e:
        print('Erro ao recuperar ou enviar a métrica: ', str(e))

    # Aguarda o próximo intervalo de atualização
    time.sleep(interval_seconds)








