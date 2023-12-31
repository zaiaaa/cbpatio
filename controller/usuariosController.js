const usuariosModel = require('../model/usuariosModel')

class UsuariosController{
    get(req, res){
        usuariosModel.get()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err.message))
    }

    logUsuario(req, res){
        const {email} = req.body
        const {senha} = req.body


        usuariosModel.logUsuario(email, senha)
        .then(usuario => res.status(200).json(usuario))
        .catch(err => res.status(400).json(err.message))
    }

    novoUsuario(req, res){
        const usuario = req.body
        
        usuariosModel.novoUsuario(usuario)
        .then(newUser => res.status(201).json(newUser))
        .catch(err => res.status(400).json(err.message))
    }

    atualizarUsuario(req, res){
        const { id } = req.params
        const usuario = req.body

        usuariosModel.atualizarUsuario(usuario, id)
        .then(usuarioAtualizado => res.status(200).json(usuarioAtualizado))
        .catch(err => res.status(400).json(err.message))
    }

    deletarUsuario(req, res){
        const { id } = req.params

        usuariosModel.deletarUsuario(id)
        .then(usuarioDeletado => res.status(204).json(usuarioDeletado))
        .catch(err => res.status(400).json(err.message))
    }


}

module.exports = new UsuariosController()