const modelLiveOn = require('../model/liveOnModel')

class ControllerTimeUsuario{
    getLiveOn(req, res){
        modelLiveOn.getLiveOn()
        .then(live => res.status(200).json(live))
        .catch(err => res.status(400).json(err.message))
    }

    alterLiveOn(req, res){
        const {id} = req.params
        const body = req.body

        modelLiveOn.alterLiveOn(id, body)
        .then(live => res.status(201).json(live))
        .catch(err => res.status(401).json(err.message))
    }
}

module.exports = new ControllerTimeUsuario()