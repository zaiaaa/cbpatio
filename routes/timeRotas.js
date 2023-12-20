const { Router } = require('express')
const router = Router()

const timeController = require('../controller/timeController')

router.get('/times', (req, res) => {
    timeController.get(req, res)
})

router.get('/times/:nome', (req, res) => {
    timeController.getByName(req, res)
})

router.post('/times/cadastrar', (req, res) => {
    timeController.novoTime(req, res)
})

router.put('/times/atualizar/:id', (req, res) => {
    timeController.alterarTime(req, res)
})

router.delete('/times/deletar/:id', (req, res) => {
    timeController.deletarTime(req, res)
})



module.exports = router