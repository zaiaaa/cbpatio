const valoresModel = require('../model/valoresModel')

class ValoresController{
    getValores(req, res){
        const {id} = req.params
        valoresModel.getValores(id)
        .then(valor => res.status(200).json(valor))
        .catch(err => res.status(400).json(err.message))
    }

    getValoresTotal(req, res){
        valoresModel.getValoresTotal()
        .then(valor => res.status(200).json(valor))
        .catch(err => res.status(400).json(err.message))
    }
    
    getPremiacao(req, res){
        valoresModel.getPremiacaoTotal()
        .then(valor => res.status(200).json(valor))
        .catch(err => res.status(400).json(err.message))
    }

    setTimePagou(req, res){
        const body = req.body

        valoresModel.setTimePagou(body)
        .then(valor => res.status(201).json(valor))
        .catch(err => res.status(403).json(err.message))
    }
}

module.exports = new ValoresController()