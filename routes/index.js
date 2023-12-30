const rotasCampeonatos = require('./campeonatoRotas')
const rotasTimes = require('./timeRotas')
const rotasUsuarios = require('./usuarioRotas')
const authRota = require('./auth')
const time_usuariosRota = require('./time_usuarioRotas')

module.exports = (app, express) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(rotasCampeonatos)
    app.use(rotasTimes)
    app.use(rotasUsuarios)
    app.use(authRota)
    app.use(time_usuariosRota)
}