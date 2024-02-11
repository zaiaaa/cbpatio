const timeModel = require('../model/timeModel')

class timeController{
    get(req, res){
        const listaDeTimes = timeModel.get()

        listaDeTimes.then(times => res.status(200).json(times))
        .catch(err => res.status(400).json(err.message))
    }

    getByName(req, res){
        const {nome} = req.params

        const listaDeTimes = timeModel.getByName(nome)

        listaDeTimes.then(times => res.status(200).json(times))
        .catch(err => res.status(400).json(err.message))
    }

    getById(req, res){
        const {id} = req.params

        timeModel.getById(id)
        .then(times => res.status(200).json(times))
        .catch(err => res.status(400).json(err.message))
    }

    novoTime(req, res){
        const novoTime = req.body

        timeModel.novoTime(novoTime)
        .then(timeCadastrado => (res.status(201).json(timeCadastrado)))
        .catch((err) => (res.status(400).json(err)))
    }

    alterarTime(req, res){
        const alteracaoTime = req.body
        const {id} = req.params

        timeModel.alterarTime(alteracaoTime, id)
        .then(timeAlterado => (res.status(201).json(timeAlterado)))
        .catch((err) => (res.status(400).json(err)))
    }

    deletarTime(req, res){
        const { id } = req.params

        timeModel.deletarTime(id).then(timeDeletado => (res.status(204).json(timeDeletado)))
        .catch((err) => (res.status(400).json(err)))
    }
}

module.exports = new timeController()