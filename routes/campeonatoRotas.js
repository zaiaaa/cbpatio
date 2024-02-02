const { Router } = require('express')
const router = Router()
const campeonatoController = require('../controller/campeonatoController')
const middleware = require('../middleware/auth')

router.get("/campeonatos", (req, res) => {
    campeonatoController.get(req, res)
   
})

router.get("/campeonatos/:nome", (req, res) => {
    campeonatoController.getByName(req, res)
})


//rotas que é obirgatio o login do admin
router.post("/campeonatos/cadastrar",  middleware, (req, res) => {
    campeonatoController.cadastrarCampeonato(req, res)
})


router.put("/campeonatos/atualizar/:id",middleware, (req, res) => {
    campeonatoController.atualizarCampeonato(req, res)
})


router.delete("/campeonatos/excluir/:id",middleware, (req, res) => {
    campeonatoController.deletarCampeonato(req, res)
})




module.exports = router