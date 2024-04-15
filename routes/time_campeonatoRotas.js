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

router.get('/campeonatos/time/times/eliminados/:id', (req, res) => {
    time_campeonatoController.getEliminadosPorJogo(req, res)
})

router.get('/campeonatos/time/times/capitaes/:id_camp', (req, res) => {
    time_campeonatoController.getCapitao(req, res)
})

router.get('/campeonatos/time/times/capitaes/:id_camp/fase/:fase', (req, res) => {
    time_campeonatoController.getCapitaoPorFase(req, res)
})

router.get('/campeonatos/time/times/jogos/:id_user', (req, res) => {
    time_campeonatoController.getTeamsUserActive(req, res)
}) 

router.put('/campeonatos/hora/jogo/:jogo/fase/:fase/chave/:chave/campeonato/:idCamp', (req, res) => {
    time_campeonatoController.setGameDateTime(req, res)
})

router.put('/campeonatos/time/alterarTime/:id', (req, res) => {
    time_campeonatoController.alteraTime_campeonato(req, res)
})

router.put('/campeonatos/time/aconteceu/fase/:fase/:id_camp', (req, res) => {
    time_campeonatoController.alterarChave(req, res)
})

router.delete('/campeonatos/time/deletar/:id', (req, res) => {
    time_campeonatoController.deletarTime_campeonato(req, res)
})

router.delete('/campeonatos/resetar/fase/:fase/:idCamp', (req, res) => {
    time_campeonatoController.resetarFase(req, res)
})

module.exports = router