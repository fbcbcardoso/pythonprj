import PyPDF2
import re
import datetime as dt
import pyodbc
import os as dir



# insere variaveis do arquivo
_cPathArq = "C:/GPS/Meus_Projetos/Projetos_FullStack_Atuais/Extrai_PDF_Python/api-extraipdf/dados/Geral/pendentes/"

_cArquivo = ""
_cArqPath = ""
_cOrigem = "PDF"
_cBancoArq = "341"
_cNomBcoPg = "BANCO ITAU UNIBANCO"

_cFilArq = "1E"
_cChave = ""
_cEmpArq = ""
_CNPJArq = ""
_cAgenPag = ""
_cCtaPag = ""
_dDataPag = ""
_cDataArq = ""
_cHoraArq = ""
_cControle = ""
_cChvToken = ""

_dAgora = dt.datetime.now()
_cDataProc = _dAgora.date().strftime('%Y%m%d')
_cDtPrc_Form = _dAgora.date()
_cHoraProc = _dAgora.strftime("%H:%M:%S")
_cUser = "fabio.cardoso"

_nValEfet = 0.0
_cNomeFun = ""
_cCpfArq = ""
_cBcoFun = "341"
_cAgFun = ""
_cCtaFun = ""

# incializa variaveis
_cTipoPag = "30"
_cFormPag = "11"
_cConvPag = ""

def fval_valor(c_valtxt):

    c_aux    = ""
    c_aux2    = ""
    c_letra   = ""
    c_letra2  = ""
    a_string  = ""
    c_stringfinal = ""

    for c_letra in c_valtxt:
        c_aux += c_letra + " "

    a_string = c_aux.split()
    
    for c_letra2 in a_string:
        ## Verifica se a string informada possui um número.
        c_aux2   = c_letra2
        c_letra2 = re.findall('[a-zA-Z]+', c_letra2)
        c_letra2 = "".join(c_letra2)
        c_stringfinal += c_aux2.replace(c_letra2,"")
        c_stringfinal = c_stringfinal.replace("/","").replace("!","").replace("@","").replace("#","").replace("%","").replace("&","")

    return (c_stringfinal)


# Funcao de gravar dados do comprovante da extração do PDF
def fgravadados(c_Insert): 

    # strings de conexão
    server = '10.11.79.50'
    database = 'DEVTEC-20230325'
    username = 'connect'
    password = 'C0nn3ct20'
    driver = '{ODBC Driver 17 for SQL Server}'
    c_Conexao = 'DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD=' + password

    with pyodbc.connect(c_Conexao) as conn:
        with conn.cursor() as cursor:
            cursor.execute(c_Insert);
    return (True) 

# Funcao de consulta dos dados da chave do banco inserida
def fquerydados(c_Select): 

    # strings de conexão
    server = '10.11.79.50'
    database = 'DEVTEC-20230325'
    username = 'connect'
    password = 'C0nn3ct20'
    driver = '{ODBC Driver 17 for SQL Server}'
    c_Conexao = 'DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD=' + password
   
    with pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD=' + password) as conn:
        with conn.cursor() as cursor:
             cursor.execute(c_Select)
             row = cursor.fetchone()
             while row:
                print(str(row[0]) + " " + str(row[1]) + " " + str(row[2]) +
                " " + str(row[3]) + " " + str(row[4]) + " " + str(row[5]))
                row = cursor.fetchone();

# Funcao que extrai os dados do PDF arquivo por arquivo 
# paramt: recebe o caminho completo do arquivo e a string com o nome
def fExtraiPDFArq(_cArqPath, _cArquivo): 

        # inicializa variavels querys
        _cSelect = ""
        _cInsert = ""

        # foi necessário fazer downgrade da versão 2.0.1
        text = open(_cArqPath, 'rb')

        buffer = PyPDF2.PdfFileReader(text)
        number_of_pages = buffer.getNumPages()
        page = buffer.getPage(0)

        c_data_pag = ""
        c_hora_pag = ""

        page_content = page.extractText()
        c_texto_limpo = ''.join(page_content)

        # remove as quebras de linha
        c_texto_limpo = re.sub('n', '', c_texto_limpo)

        # Extrai dado do controle/lote pagamento
        nVL = 15  # tamanho campo valor
        nVLx = 5  # tamanho posição após achar string
        nVL1 = c_texto_limpo.find("CTRL ") + nVLx
        nVL2 = nVL1 + nVL
        _cControle = c_texto_limpo[nVL1:nVL2:1].strip()
 
        # Extrai dado da data do arquivo
        nVL = 10  # tamanho campo valor
        nVLx = 13  # tamanho posição após achar string
        nVL1 = c_texto_limpo.find("realizada em") + nVLx
        nVL2 = nVL1 + nVL
        _cDataArq = c_texto_limpo[nVL1:nVL2:1].strip().replace(".", "/")
   
        # Extrai dado da hora do arquivo
        nVL = 8  # tamanho campo valor
        nVLx = 27  # tamanho posição após achar string
        nVL1 = c_texto_limpo.find("realizada em") + nVLx
        nVL2 = nVL1 + nVL
        _cHoraArq = c_texto_limpo[nVL1:nVL2:1].strip()
 
        # Extrai dado do CNPJ da empresa Pagadora
        nVL = 30  # tamanho campo valor
        nVLx = 45  # tamanho posição após achar string
        nVL1 = c_texto_limpo.find("debitada:") + nVLx
        nVL2 = nVL1 + nVL
        _cEmpArq = c_texto_limpo[nVL1:nVL2:1].strip().upper()
 
        # Extrai dado da agencia pagadora
        nag = 5  # tamanho campo agencia
        nagx = 18  # tamanho posição após achar string
        nag1 = c_texto_limpo.find("debitada:") + nagx
        nag2 = nag1 + nag
        _cAgenPag = c_texto_limpo[nag1:nag2:1].strip()

        # Extrai dado da conta corrente pagadora
        nct = 11  # tamanho campo conta
        nctx = 28  # tamanho posição após achar string
        nct1 = c_texto_limpo.find("debitada:") + nctx
        nct2 = nct1 + nct
        _cCtaPag = c_texto_limpo[nct1:nct2:1].replace(
            " ", "").replace("-", "")

        # Extrai dado da data de pagamento
        ndtp = 10  # tamanho campo conta
        ndtpx = 13  # tamanho posição após achar string
        ndtp1 = c_texto_limpo.find("realizada em") + ndtpx
        ndtp2 = ndtp1 + ndtp
        _dDataPag = c_texto_limpo[ndtp1:ndtp2:1].strip().replace(".", "/")

        # Extrai dado do valor pago ao colaborador
        nVL = 8  # tamanho campo valor
        nVLx = 9  # tamanho posição após achar string
        nVL1 = c_texto_limpo.find("Valor:") + nVLx
        nVL2 = nVL1 + nVL
        _nValEfet = c_texto_limpo[nVL1:nVL2:1].strip().replace(
            ".", "").replace(",", ".").replace("\nI", "")

        # Extrai dado do colaborador que recebe o pagamento
        nVL = 30  # tamanho campo valor
        nVLx = 45  # tamanho posição após achar string
        nVL1 = c_texto_limpo.find("creditada:") + nVLx
        nVL2 = nVL1 + nVL
        _cNomeFun = c_texto_limpo[nVL1:nVL2:1].strip().upper()
 
        # Extrai dado da agencia creditada
        nag = 5  # tamanho campo agencia
        nagx = 18  # tamanho posição após achar string
        nag1 = c_texto_limpo.find("creditada:") + nagx
        nag2 = nag1 + nag
        _cAgFun = c_texto_limpo[nag1:nag2:1].strip()

        # Extrai dado da conta corrente creditada
        nct = 10  # tamanho campo conta
        nctx = 30  # tamanho posição após achar string
        nct1 = c_texto_limpo.find("creditada:") + nctx
        nct2 = nct1 + nct
        _cCtaFun = c_texto_limpo[nct1:nct2:1].replace(
            " ", "").replace("-", "")
 
        # Extrai dado da conta corrente creditada
        nct = 64  # tamanho campo conta
        nctx = 9  # tamanho posição após achar string
        nct1 = c_texto_limpo.find("ticação:") + nctx
        nct2 = nct1 + nct
        _cChvToken = c_texto_limpo[nct1:nct2:1].strip()
 
        _cDataArq = _cDataArq[6:10] + _cDataArq[3:5]+_cDataArq[:2]
        _dDataPag = _dDataPag[6:10] + _dDataPag[3:5]+_dDataPag[:2]

        # impressão do progresso da rotina - por arquivo 
        print("Arquivo:  ", _cArquivo)
        print("Autenticacao:  ", _cChvToken)

        # limpando caracters da string do campo valor 
        _nValEfet = fval_valor(_nValEfet)

        # checando se a variavel do valor é numerica 
        if _nValEfet == '': 
            _nValEfet = '0.0'
        
        print("Valor: ", _nValEfet)
        _cInsert  = " INSERT ZBX010(ZBX_FILIAL, ZBX_EMPPAG, ZBX_CNPARQ, ZBX_IDBCO ,ZBX_ORIGEM,			"
        _cInsert += " ZBX_BCOARQ, ZBX_CHVINT,ZBX_AGEPAG,ZBX_CTAPAG,ZBX_TIPPAG,ZBX_FORPAG,ZBX_CONV,		"
        _cInsert += " ZBX_CPFBEN, ZBX_NOMBEN,ZBX_BCOBEN,ZBX_AGEBEN,ZBX_CTABEN,ZBX_VALOR ,ZBX_DATPAG,	"
        _cInsert += " ZBX_DATARQ, ZBX_HORARQ, ZBX_CHVBCO,ZBX_CONTRL,ZBX_HPROCE,ZBX_DPROCE,ZBX_ARQUIV,	"
        _cInsert += " ZBX_USER,R_E_C_N_O_) 															 	"
        _cInsert += " VALUES( "
        _cInsert += "'" + _cFilArq + "',"  # ZBX_FILIAL,
        _cInsert += "'" + _cEmpArq + "',"  # ZBX_EMPPAG,
        _cInsert += "'" + _CNPJArq + "',"  # ZBX_CNPARQ,
        _cInsert += "'" + _cNomBcoPg + "',"  # ZBX_IDBCO ,
        _cInsert += "'" + _cOrigem + "',"  # ZBX_ORIGEM,
        _cInsert += "'" + _cBancoArq + "',"  # ZBX_BCOARQ,
        _cInsert += "'" + _cChave + "',"  # ZBX_CHVINT,
        _cInsert += "'" + _cAgenPag + "',"  # ZBX_AGEPAG,
        _cInsert += "'" + _cCtaPag + "',"  # ZBX_CTAPAG,
        _cInsert += "'" + _cTipoPag + "',"  # ZBX_TIPPAG,
        _cInsert += "'" + _cFormPag + "',"  # ZBX_FORPAG,
        _cInsert += "'" + _cConvPag + "',"  # ZBX_CONV,
        _cInsert += "'" + _cCpfArq + "',"  # ZBX_CPFBEN,
        _cInsert += "'" + _cNomeFun + "',"  # ZBX_NOMBEN,
        _cInsert += "'" + _cBcoFun + "',"  # ZBX_BCOBEN,
        _cInsert += "'" + _cAgFun + "',"  # ZBX_AGEBEN,
        _cInsert += "'" + _cCtaFun + "',"  # ZBX_CTABEN,
        _cInsert += " " + str(_nValEfet) + ","   # ZBX_VALOR ,
        _cInsert += "'" + _dDataPag + "',"  # ZBX_DATPAG,
        _cInsert += "'" + _cDataArq + "',"  # ZBX_DATARQ,
        _cInsert += "'" + _cHoraArq + "',"  # ZBX_HORARQ,
        _cInsert += "'" + _cChvToken + "',"  # ZBX_CHVBCO,
        _cInsert += "'" + _cControle + "',"  # ZBX_CONTRL,
        _cInsert += "'" + _cHoraProc + "',"  # ZBX_HPROCE,
        _cInsert += "'" + _cDataProc + "',"  # ZBX_DPROCE,
        _cInsert += "'" + _cArquivo + "',"  # ZBX_ARQUIV,
        _cInsert += "'" + _cUser + "',"  # ZBX_USER
        # RECNO
        _cInsert += "(SELECT CASE WHEN MAX(R_E_C_N_O_) IS NULL THEN 1 ELSE MAX(R_E_C_N_O_) + 1 END FROM ZBX010(NOLOCK))" + ")"

        # grava apenas se existir token na extração
        if len(_cChvToken):
            fgravadados(_cInsert);

        text.close()
            
    
            # chama funcao pra imprimir linha a linha - chave do banco 
            # fquerydados(_cSelect);

# FIM DO LOOP LEITURA ARQUIVO A ARQUIVO ;



for diretorio, subpastas, arquivos in dir.walk(_cPathArq):
    for arquivo in arquivos:
        #  print(dir.path.join(diretorio, arquivo))
        
        _cArqPath = dir.path.join(diretorio, arquivo)
        _cArquivo = arquivo
        _cArquivo = _cArquivo.upper()

        # chama função de extração do arquivo linha a linha e grava os dados 
        fExtraiPDFArq(_cArqPath, _cArquivo)

        arq_old = _cPathArq+ "../processados/" + _cArquivo
        dir.rename(_cArqPath , arq_old)


       
# FIM DO CODIGO 
