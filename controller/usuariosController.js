const usuariosModel = require('../model/usuariosModel')

class UsuariosController{
    get(req, res){
        usuariosModel.get()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err.message))
    }

    novoUsuario(req, res){
        const usuario = req.body

        usuariosModel.novoUsuario(usuario)
        .then(newUser => res.status(201).json(newUser))
        .catch(err => res.status(400).json(err.message))
    }
}

module.exports = new UsuariosController()