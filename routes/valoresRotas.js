const { Router } = require('express')
const router = Router()
const valoresController = require('../controller/valoresController')

router.get("/campeonatos/pagamentos/:id", (req, res) => {
    valoresController.getValores(req, res)
})

router.get("/campeonatos/times/pagamentos", (req, res) => {
    valoresController.getValoresTotal(req, res)
})

router.get("/campeonatos/premiacao/total", (req, res) => {
    valoresController.getPremiacao(req, res)
})


module.exports = router