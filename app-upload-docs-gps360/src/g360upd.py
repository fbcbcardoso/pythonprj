import re
import datetime as dt
import pyodbc
import os as dir
import requests
import base64
import mysql.connector
from mysql.connector import errorcode

# declaração / atribuição de variaveis 
_dAgora = dt.datetime.now()
_cDataProc = _dAgora.date().strftime('%Y%m%d')
_cDtPrc_Form = _dAgora.date()
_cHoraProc = _dAgora.strftime("%H:%M:%S")
_cUser = "fabio.cardoso"

# insere variaveis do arquivo
c_cPathArq = "C:/GPS/Meus_Projetos/Projetos_FullStack_Atuais/app-upload-docs-gps360/pendentes/"

# variaveis para o json
c_projeto		=	""
c_apiURL		=	""
c_apipath		=	""
c_templateid	=	""
c_model			=	""
c_mailcnta		=	""
c_maillista		=	""


def fGravaLogExecJson(c_cnpj,c_period,c_arquivo,c_jmodel,c_stcode,c_jreason,c_jtexto,c_json): 
    
    # strings de conexão
    c_server = '127.0.0.1'
    c_database = 'rpa'
    c_username = 'root'
    c_psw = 'Gps@#rpa2022'
    c_Insert    = ""

    c_Insert    += " insert into rpa.UPCERG360LG_LOG_EXEC ( "
    c_Insert    += "   UPCERG360LG_CNPJ    ,                "
    c_Insert    += "   UPCERG360LG_PERIODO ,                "  
    c_Insert    += "   UPCERG360LG_ARQUIVO ,                " 
    c_Insert    += "   UPCERG360LG_JMODEL  ,                " 
    c_Insert    += "   UPCERG360LG_JSTCODE ,                " 
    c_Insert    += "   UPCERG360LG_JREASON ,                "
    c_Insert    += "   UPCERG360LG_JTEXTO  ,                "
    c_Insert    += "   UPCERG360LG_JSON    ,                "
    c_Insert    += "   UPCERG360LG_DTHORA  ,                "
    c_Insert    += "   D_E_L_E_T_ )                         "
    c_Insert    += "    values (                            "
    c_Insert    += "     '" + c_cnpj         + "',          "
    c_Insert    += "     '" + c_period       + "',          "
    c_Insert    += "     '" + c_arquivo      + "',          "
    c_Insert    += "     '" + c_jmodel       + "',          "
    c_Insert    += "     '" + str(c_stcode)  + "',          "
    c_Insert    += "     '" + str(c_jreason) + "',          "
    c_Insert    += "     '" + str(c_jtexto)  + "',          "
    c_Insert    += "     '" + str(c_json)    + "',          "
    c_Insert    += "     Now()              ,               "
    c_Insert    += "     ''                                 "
    c_Insert    += "     )                                  "
    
    #print(c_Insert)
 
    try:
	    db_connection = mysql.connector.connect(host=c_server, user=c_username, password=c_psw, database=c_database)
	    with db_connection.cursor() as cursor:
             cursor.execute(c_Insert)
             db_connection.commit()
             print("Record Inserted Successfully !!")
                
    except mysql.connector.Error as error:
	    if error.errno == errorcode.ER_BAD_DB_ERROR:
		    print("Database doesn't exist")
	    elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
		    print("User name or password is wrong")
	    else:
		    print(error)
    else:
	    db_connection.close()
  
 
# Funcao de consulta dos dados da chave do banco inserida
def fqueryconfig(): 
    
    # strings de conexão
    c_server = '127.0.0.1'
    c_database = 'rpa'
    c_username = 'root'
    c_psw = 'Gps@#rpa2022'
    c_Select = ""


    # string da query de seleção configuração
    c_Select =  " select 					"
    c_Select +=	" UPCERG360_ID				" 
    c_Select +=	" ,UPCERG360_PROJETO 		"
    c_Select +=	" ,UPCERG360_API_URL		"
    c_Select +=	" ,UPCERG360_API_PATH 		"
    c_Select +=	" ,UPCERG360_TEMPLATEID 	"
    c_Select +=	" ,UPCERG360_MODEL 			"
    c_Select +=	" ,UPCERG360_EMAIL_CONTA	"
    c_Select +=	" ,UPCERG360_EMAIL_LISTA  	"
    c_Select +=	" from RPA.UPCERG360_CONFIG "
    c_Select +=	" limit 1					"

    try:
	    db_connection = mysql.connector.connect(host=c_server, user=c_username, password=c_psw, database=c_database)
	    #print("Database connection successful!!");
	
	    with db_connection.cursor() as cursor:
             cursor.execute(c_Select)
             row = cursor.fetchone()
                
    except mysql.connector.Error as error:
	    if error.errno == errorcode.ER_BAD_DB_ERROR:
		    print("Database doesn't exist")
	    elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
		    print("User name or password is wrong")
	    else:
		    print(error)
    else:
	    db_connection.close()
    
    c_projeto		=	str(row[1])
    c_apiURL		=	str(row[2])
    c_apipath		=	str(row[3])
    c_templateid	=	str(row[4])
    c_model			=	str(row[5])
    c_mailcnta		=	str(row[6])
    c_maillista		=	str(row[7])
    c_endpoint      =   c_apiURL+c_apipath

    return c_projeto, c_endpoint, c_templateid, c_model, c_mailcnta, c_maillista 


# Chama a API enviando json montado com base nos dados do arquivo 
def fUploadAPI(c_endpoint,c_templateid,c_arquivo,c_model,c_cproviderCnpj,c_cperiod,c_cToken): 
    
    c_BaseEncod = 'utf-8'
    c_pdfx64    =  c_cToken.decode(c_BaseEncod)

    j_dados = {
                "templateId":c_templateid,
                "providerCnpj":c_cproviderCnpj,
                "customerCnpj":"",
                "period":c_cperiod,
                "model":c_model,
                "base64":c_pdfx64
              }  
  
    response = requests.post(url=c_endpoint, json=j_dados)
    
    c_stcode    = response.status_code
    c_jreason   = response.reason
    c_jtexto    = response.text
    c_json      = response.json()
       
    if response.status_code >= 200 and response.status_code <= 299:
        #post com sucesso 
        print("Status code:", response.status_code)
        print("Reason:", response.reason)
        print("Texto:", response.text)
        print("JSON:", response.json())
        
    else: 
        #post com falha 
        print("Status code:", response.status_code)
        print("Reason:", response.reason)
        print("Texto:", response.text)
   
    #fGravaLogExecJson(c_cproviderCnpj,c_cperiod,c_arquivo,c_model,c_stcode,c_jreason,c_jtexto,c_json)
    
# Funcao que extrai os dados do PDF arquivo por arquivo 
# paramt: recebe o caminho completo do arquivo e a string com o nome
def fExtraiArquivox64(_cArqPath, _cArquivo): 
    
        # inicializa variavels querys
        _cSelect = ""
        _cInsert = ""
        
        # foi necessário fazer downgrade da versão 2.0.1
        text = open(_cArqPath, 'rb')
        
        c_cproviderCnpj  = _cArquivo[0:14]
        c_cperiod        = _cArquivo[15:22]
        c_cToken         = text.read()
        
        c_projeto, c_endpoint, c_templateid, c_model, c_mailcnta, c_maillista = fqueryconfig();
              
        fUploadAPI(c_endpoint,c_templateid,_cArquivo,c_model,c_cproviderCnpj,c_cperiod,c_cToken)

def fLoopdirArquivos(c_cPathArq): 
    for diretorio, subpastas, arquivos in dir.walk(c_cPathArq):
        for arquivo in arquivos:        
            _cArqPath = dir.path.join(diretorio, arquivo)
            _cArquivo = arquivo
            _cArquivo = _cArquivo.upper()

            # chama função de extração do arquivo linha a linha e grava os dados 
            fExtraiArquivox64(_cArqPath, _cArquivo)

            arq_old = c_cPathArq+ "../processados/" + _cArquivo
            dir.rename(_cArqPath , arq_old)
            
fLoopdirArquivos(c_cPathArq);

# FIM DO CODIGO 
