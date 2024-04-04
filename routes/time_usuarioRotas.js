const { Router } = require('express')
const router = Router()
const time_usuarioController = require('../controller/controllerTime_usuario')

router.get('/usuarios/time', (req, res) => {
    time_usuarioController.get(req, res)
})

router.get('/usuarios/time/convite/:id', (req, res) => {
    time_usuarioController.getConvites(req, res)
})

router.post('/usuarios/time/novoUsuario', (req, res) => {
    time_usuarioController.novoUsuarioTime(req, res)
})

router.post('/usuarios/time/convidar', (req, res) => {
    time_usuarioController.convidarUsuarioParaTime(req, res)
})

router.put('/usuarios/time/aceitou/:id_solicitacao', (req, res) => {
    time_usuarioController.aceitaConvite(req, res)
})

router.delete('/usuarios/time/deletar/:id_time/:id_usuario', (req, res) => {
    time_usuarioController.deletarUsuario_time(req, res)
})

router.delete('/usuarios/time/recusarConvite/:id', (req, res)  => {
    time_usuarioController.recusarConvite(req, res)
})

module.exports = router