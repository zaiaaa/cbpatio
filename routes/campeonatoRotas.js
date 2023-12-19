const { Router } = require('express')
const router = Router()
const campeonatoController = require('../controller/campeonatoController')

router.get("/campeonatos", (req, res) => {
    campeonatoController.get(req, res)
   
})

router.get("/campeonatos/:nome", (req, res) => {
    campeonatoController.getByName(req, res)
})

router.post("/campeonatos/cadastrar", (req, res) => {
    campeonatoController.cadastrarCampeonato(req, res)
})


router.put("/campeonatos/atualizar/:id", (req, res) => {
    campeonatoController.atualizarCampeonato(req, res)
})


router.delete("/campeonatos/excluir/:id", (req, res) => {
    campeonatoController.deletarCampeonato(req, res)
})




module.exports = router