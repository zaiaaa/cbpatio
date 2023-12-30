const { Router } = require('express')
const router = Router()
const time_usuarioController = require('../controller/controllerTime_usuario')

router.get('/usuarios/time', (req, res) => {
    time_usuarioController.get(req, res)
})

router.post('/usuarios/time/novoUsuario', (req, res) => {
    time_usuarioController.novoUsuarioTime(req, res)
})

router.delete('/usuarios/time/deletar/:id_time/:id_usuario', (req, res) => {
    time_usuarioController.deletarUsuario_time(req, res)
})

module.exports = router