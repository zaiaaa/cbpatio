const usuariosController = require('../controller/usuariosController')

const {Router} = require('express')
const { route } = require('./timeRotas')
const router = Router()

router.get('/usuarios', (req, res) => {
    usuariosController.get(req, res)
})

router.post('/usuarios/cadastrar', (req, res) => {
    usuariosController.novoUsuario(req, res)
})

module.exports = router