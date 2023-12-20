const usuariosModel = require('../model/usuariosModel')

class UsuariosController{
    get(req, res){
        usuariosModel.get()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err.message))
    }
}

module.exports = new UsuariosController()