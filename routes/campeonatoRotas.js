const { Router } = require('express')
const router = Router()
const campeonatoController = require('../controller/campeonatoController')

router.get("/campeonatos", (req, res) => {
    const listagemDeCampeonatos = campeonatoController.get()
    listagemDeCampeonatos
    .then(campeonatos => res.status(200).json(campeonatos))
    .catch(err => res.status(400).json(err.message))
})


module.exports = router