const rotasCampeonatos = require('./campeonatoRotas')
const rotasTimes = require('./timeRotas')


module.exports = (app, express) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(rotasCampeonatos)
    app.use(rotasTimes)
}