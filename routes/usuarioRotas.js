const usuariosController = require('../controller/usuariosController')

const {Router} = require('express')
const router = Router()

router.get('/usuarios', (req, res) => {
    usuariosController.get(req, res)
})

module.exports = router