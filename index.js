const express = require('express')
const app = express()
const port = 3005 


require('dotenv').config()

app.get('/', (req, res) => {
    res.send('ola mundo')
})


app.listen(port | process.env.PORT, (e) => {
    if(e){
        console.error('erro -> ', e)
    }
    console.log(`Aplicação rodando em http://localhost:${port}`)
})