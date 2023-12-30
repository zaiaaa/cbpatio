const modelTimeUsuario = require('../model/modelTime_usuario')

class ControllerTimeUsuario{
    get(req, res){
        modelTimeUsuario.get()
        .then(time_usuario => res.status(200).json(time_usuario))
        .catch(err => res.status(400).json(err.message))
    }

    novoUsuarioTime(req, res){
        const newUserTeam = req.body
        modelTimeUsuario.novoUsuarioNoTime(newUserTeam)
        .then(time_usuario => res.status(201).json(time_usuario))
        .catch(err => res.status(400).json(err.message))
    }

    deletarUsuario_time(req, res){
        const {id_time} = req.params
        const {id_usuario} = req.params
        console.log(id_time)

        modelTimeUsuario.deletarUsuario_time(id_time, id_usuario)
        .then(time_usuario => res.status(204).json(time_usuario))
        .catch(err => res.status(400).json(err.message))
    }
}

module.exports = new ControllerTimeUsuario()