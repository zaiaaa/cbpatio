const usuariosController = require('../controller/usuariosController')
const middleware = require('../middleware/auth')
const {uploadUser} = require("../config/multer")

const {Router} = require('express')
const router = Router()

router.get('/usuarios', middleware, (req, res) => {
    usuariosController.get(req, res)
})

router.get('/usuarios/:id', middleware, (req, res) => {
    usuariosController.getById(req, res)
})

router.get('/usuarios/nome/:nome_usuario', (req, res) => {
    usuariosController.getByUsername(req, res)
})

router.post('/usuarios/cadastrar', uploadUser.single("foto"), (req, res) => {
    usuariosController.novoUsuario(req, res)
})

router.post('/usuarios/login', (req, res) => {
    //A requisição agora é POST, por ser infinitamente mais seguro.
    usuariosController.logUsuario(req, res)
})

router.put('/usuarios/atualizar/:id', uploadUser.single("foto"), (req, res) => {
    usuariosController.atualizarUsuario(req, res)
})

router.delete('/usuarios/excluir/:id', (req, res) => {
    usuariosController.deletarUsuario(req, res)
})

module.exports = router