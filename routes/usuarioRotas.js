const usuariosController = require('../controller/usuariosController')

const {Router} = require('express')
const router = Router()

router.get('/usuarios', (req, res) => {
    usuariosController.get(req, res)
})

router.post('/usuarios/cadastrar', (req, res) => {
    usuariosController.novoUsuario(req, res)
})

router.get('/usuarios/login', (req, res) => {
    //Requisição deve ser feita com /usuarios/login?email=email.com&senha=senha
    //na parte de login do usuario, não é necessário o uso de jwt, mas para a visualização da api sim.
    usuariosController.logUsuario(req, res)
})

router.put('/usuarios/atualizar/:id', (req, res) => {
    usuariosController.atualizarUsuario(req, res)
})

router.delete('/usuarios/deletar/:id', (req, res) => {
    usuariosController.deletarUsuario(req, res)
})

module.exports = router