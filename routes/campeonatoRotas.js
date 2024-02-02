const { Router } = require('express')
const router = Router()
const campeonatoController = require('../controller/campeonatoController')
const {uploadCampeonato} = require('../config/multer')
const middleware = require('../middleware/auth')

router.get("/campeonatos", (req, res) => {
    campeonatoController.get(req, res)
   
})

router.get("/campeonatos/:nome", (req, res) => {
    campeonatoController.getByName(req, res)
})

router.get("/campeonatos/id/:id", (req, res) => {
    campeonatoController.getById(req, res)
})

router.post("/campeonatos/cadastrar", uploadCampeonato.single("foto"), (req, res) => {
    campeonatoController.cadastrarCampeonato(req, res)
})


router.put("/campeonatos/atualizar/:id", uploadCampeonato.single("foto"), (req, res) => {
    campeonatoController.atualizarCampeonato(req, res)
})


router.delete("/campeonatos/excluir/:id", middleware, (req, res) => {
    campeonatoController.deletarCampeonato(req, res)
})




module.exports = router