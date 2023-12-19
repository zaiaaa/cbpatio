const { Router } = require('express')
const router = Router()
const campeonatoController = require('../controller/campeonatoController')

router.get("/campeonatos", (req, res) => {
    campeonatoController.get(req, res)
   
})

router.get("/campeonatos/:nome", (req, res) => {
    const { nome } = req.params
    campeonatoController.getByName(req, res, nome)

})

router.post("/campeonatos/cadastrar", (req, res) => {
    console.log(req.body)
    campeonatoController.cadastrarCampeonato(req, res)

})





module.exports = router