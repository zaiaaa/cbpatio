const { Router } = require('express')
const router = Router()
const time_campeonatoController = require('../controller/time_campeonatoController')

router.post('/campeonatos/time/novoTime', (req, res) => {
    time_campeonatoController.novoTimeCampeonato(req, res)
})

router.get('/campeonatos/time/times', (req, res) => {
    time_campeonatoController.getTimes_campeonato(req, res)
})

router.get('/campeonatos/time/times/:id', (req, res) => [
    time_campeonatoController.getTimes_porCampeonato(req, res)
])

router.get('/campeonatos/time/times/fase/:fase/:idCamp', (req, res) => {
    time_campeonatoController.getTimesPorFase(req, res)
})

router.get('/campeonatos/time/times/chave/:chave/:idCamp/:fase', (req, res) => {
    time_campeonatoController.getTimesPorChave(req, res)
})

router.get('/campeonatos/time/times/nome/ids/:id', (req, res) => {
    time_campeonatoController.getNomeTime(req, res)
})

router.put('/campeonatos/time/alterarTime/:id', (req, res) => {
    time_campeonatoController.alteraTime_campeonato(req, res)
})

router.delete('/campeonatos/time/deletar/:id', (req, res) => {
    time_campeonatoController.deletarTime_campeonato(req, res)
})

module.exports = router