const rotasCampeonatos = require('./campeonatoRotas')
const rotasTimes = require('./timeRotas')
const rotasUsuarios = require('./usuarioRotas')
const authRota = require('./auth')
const time_usuariosRota = require('./time_usuarioRotas')
const time_campeonatosRota = require('./time_campeonatoRotas')
const liveonRoute = require("./liveOnRoute")
const valoresRoute = require("./valoresRotas")
const pagamento = require('./socket_pagamentos')

module.exports = (app, express) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(rotasCampeonatos)
    app.use(rotasTimes)
    app.use(rotasUsuarios)
    app.use(authRota)
    app.use(time_usuariosRota)
    app.use(time_campeonatosRota)
    app.use(liveonRoute)
    app.use(valoresRoute)
    app.use(pagamento)
}