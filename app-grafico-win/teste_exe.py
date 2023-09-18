# importando bilbiotecas
import requests
import time
import json

from tkinter import *
from tkinter import ttk
from PIL import ImageTk, Image,ImageOps , ImageDraw

################# cores ###############
co0 = "#444466"  # Preta
co1 = "#feffff"  # branca
co2 = "#6f9fbd"  # azul
fundo = "#484f60"

janela = Tk()
janela.title('')
janela.geometry('320x350')
janela.configure(bg=fundo)

################# Frames ####################

ttk.Separator(janela, orient=HORIZONTAL).grid(row=0, columnspan=1, ipadx=157)

frame_principal = Frame(janela, width=320, height=50,bg=co1, pady=0, padx=0, relief="flat",)
frame_principal.grid(row=1, column=0)

frame_corpo = Frame(janela, width=320, height=300,bg=fundo, pady=12, padx=0, relief="flat",)
frame_corpo.grid(row=2, column=0, sticky=NW)

style = ttk.Style(frame_principal)
style.theme_use("clam")

def info():
    api_link = "https://viacep.com.br/ws/04616002/json/"
    
    # -- HTTP request
    r=requests.get(api_link)

    # -- converter os dados em dicionario
    dados=r.json()

    # -- CEP
    valor_cep = dados["cep"]
    l_dados_cep["text"] = "Cep: " + valor_cep

    # -- logradouro
    valor_logra = dados["logradouro"]
    l_dados_logra["text"] = "Logradouro: " + valor_logra

    # -- bairro
    valor_bairro = dados["bairro"]
    l_dados_bairro["text"] = "Bairro: " + valor_bairro


    # -- localidade
    valor_municp = dados["localidade"]
    l_dados_municp["text"] = "Município: " + valor_municp


    frame_corpo.after(1000, info)


imagem = Image.open('imagens/bitcoin01.png')


imagem = imagem.resize((30, 30))
imagem = ImageTk.PhotoImage(imagem)
l_icon1 = Label(frame_principal,image=imagem, compound=LEFT,  bg=fundo, fg="white",font=('Ivy 10 bold'), anchor="nw", relief=FLAT)
l_icon1.place(x=10, y=10)

l_nome = Label(frame_principal, text="Rastreio de CEP", height=1, padx=0, relief="flat", anchor="center", font=('Arial 20 '), bg=co1, fg=co2)
l_nome.place(x=50, y=5)

l_dados_cep = Label(frame_corpo, text="", width=14, height=1, padx=0, relief="flat", anchor="center", font=('Arial 30 '), bg=fundo, fg=co1)
l_dados_cep.place(x=0, y=50)


l_dados_bairro = Label(frame_corpo, text="", height=1, padx=0, relief="flat", anchor="center", font=('Arial 12 '), bg=fundo, fg=co1)
l_dados_bairro.place(x=10, y=130)

l_dados_municp = Label(frame_corpo, text="",height=1, padx=0, relief="flat", anchor="center", font=('Arial 12 '), bg=fundo, fg=co1)
l_dados_municp.place(x=10, y=160)

l_dados_logra = Label(frame_corpo, text="",height=1, padx=0, relief="flat", anchor="center", font=('Arial 12 '), bg=fundo, fg=co1)
l_dados_logra.place(x=10, y=190)

info()

janela.mainloop()