const cors = require('cors')
const express = require('express')
const app = express()
<<<<<<< HEAD
const port = 3005
app.use(cors({})) 
=======
const port = 3005 
const cors = require("cors")
>>>>>>> aa726c8c7a8e34e9eac9b4fb3daa84a21c01dc7a
require('dotenv').config()
const router = require('./routes/index')
const criarTabelas = require("./inc/criarTabelas")
const conn = require("./inc/conexao")

app.use(cors());

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