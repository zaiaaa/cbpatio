const usuariosModel = require('../model/usuariosModel')
const fs = require("fs")

class UsuariosController{
    get(req, res){
        usuariosModel.get()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err.message))
    }

    getById(req, res){
        const {id} = req.params
        usuariosModel.getById(id)        
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
        const foto = req.file

        usuario.foto = foto.path


        usuariosModel.novoUsuario(usuario)
        .then(newUser => res.status(201).json(newUser))
        .catch(err => res.status(400).json(err.message))
    }

    async atualizarUsuario(req, res){
        const { id } = req.params
        const userJson = await usuariosModel.getById(id)
        const userFoto = userJson[0].foto
        const path = userFoto.replace(/\\/g, "/")
        console.log(path)
        if(fs.existsSync(path)){
            fs.unlink(path, (err) => {
                if(err) console.log(err)
                console.log(`Foto ${path} excluida com sucesso`)
            })
        }

        const usuario = req.body
        const foto = req.file

        usuario.foto = foto.path

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