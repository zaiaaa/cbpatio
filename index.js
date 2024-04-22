require('dotenv').config()
const cors = require('cors')
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const SocketServer = require('./model/socket_pagamentos')
app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
})) 

const router = require('./routes/index')
const criarTabelas = require("./inc/criarTabelas")
const conn = require("./inc/conexao")

router(app, express)
criarTabelas.init(conn)

app.use('/fotoCampeonatos', express.static('./fotoCampeonatos'));
app.use('/fotoUsuarios', express.static('./fotoUsuarios'));

app.get('/', (req, res) => {
    res.send({
            "autores": "Gustavo Zaia e Pedro Castelo Branco",
            "empresa": "CBPATIO (Todos os direitos reservados.)"
            })
})


server.listen(3005 || process.env.PORT, (e) => {
    if(e){
        console.error('erro -> ', e)
    }
    console.log(`Aplicação rodando em http://localhost:${3005 || process.env.PORT }`)
})

SocketServer.init(server)


//aaaaaa