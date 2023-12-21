const rotasCampeonatos = require('./campeonatoRotas')
const rotasTimes = require('./timeRotas')
const rotasUsuarios = require('./usuarioRotas')

module.exports = (app, express) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(rotasCampeonatos)
    app.use(rotasTimes)
    app.use(rotasUsuarios)
}