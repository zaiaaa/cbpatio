const express = require('express')
const app = express()

require('dotenv').config()

app.get('/', (req, res) => {
    res.send('ola mundo')
})


app.listen(3005 | process.env.PORT, (e) => {
    if(e){
        console.error('erro -> ', e)
    }
    console.log('rodando na 3005')
})