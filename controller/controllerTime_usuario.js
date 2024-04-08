const modelTime_usuario = require('../model/modelTime_usuario')
const modelTimeUsuario = require('../model/modelTime_usuario')

class ControllerTimeUsuario{
    get(req, res){
        modelTimeUsuario.get()
        .then(time_usuario => res.status(200).json(time_usuario))
        .catch(err => res.status(400).json(err.message))
    }

    getByIdTime(req, res){
        const { id_time } = req.params
        modelTimeUsuario.getByIdTime(id_time)
        .then(time_usuario => res.status(200).json(time_usuario))
        .catch(err => res.status(400).json(err.message))
    }

    getByIdUser(req, res){
        const { id_usuario } = req.params
        modelTimeUsuario.getByIdUser(id_usuario)
        .then(time_usuario => res.status(200).json(time_usuario))
        .catch(err => res.status(400).json(err.message))
    }

    getConvites(req, res){
        const {id} = req.params
        modelTimeUsuario.getConvites(id)
        .then(solicitacao => res.status(200).json(solicitacao))
        .catch(err => res.status(400).json(err.message))
    }

    novoUsuarioTime(req, res){
        const newUserTeam = req.body
        modelTimeUsuario.novoUsuarioNoTime(newUserTeam)
        .then(time_usuario => res.status(201).json(time_usuario))
        .catch(err => res.status(400).json(err.message))
    }

    convidarUsuarioParaTime(req, res){
        const invite = req.body

        modelTimeUsuario.convidarUsuarioParaTime(invite)
        .then(time_usuario => res.status(201).json(time_usuario))
        .catch(err => res.status(400).json(err.message))
    }

    aceitaConvite(req, res){
        const {id_solicitacao} = req.params
        const aceitou = req.body
    
        modelTimeUsuario.aceitaConvite(id_solicitacao, aceitou)
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

    recusarConvite(req, res){
        const {id} = req.params

        modelTimeUsuario.recusarConvite(id)
        .then(() => res.status(204).json({msg: "Recusado com sucesso!"}))
        .catch(err => res.status(400).json(err.message))

    }
}

module.exports = new ControllerTimeUsuario()