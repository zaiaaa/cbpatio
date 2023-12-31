const express = require('express')
const app = express()
const port = 3005 
require('dotenv').config()

const router = require('./routes/index')

const criarTabelas = require("./inc/criarTabelas")

const conn = require("./inc/conexao")



router(app, express)
criarTabelas.init(conn)


app.get('/', (req, res) => {
    res.send({
            "autores": "Gustavo Zaia e Pedro Castelo Branco",
            "empresa": "CBPATIO (Todos os direitos reservados.)"
            })
})


app.listen(port | process.env.PORT, (e) => {
    if(e){
        console.error('erro -> ', e)
    }
    console.log(`Aplicação rodando em http://localhost:${port}`)
})

//aaaaaa