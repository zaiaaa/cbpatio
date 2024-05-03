require('dotenv').config()
const cors = require('cors')
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const SocketServer = require('./model/socket_pagamentos')
app.use(cors({
    origin: ["https://cbpatio.vercel.app", "https://cbpatio-admin.vercel.app"],
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


server.listen(process.env.PORT || 3005, (e) => {
    if(e){
        console.error('erro -> ', e)
    }
    console.log(`Aplicação rodando em http://localhost:${process.env.PORT || 3005} (vtnc)`)
})

SocketServer.init(server)


//aaaaaa
