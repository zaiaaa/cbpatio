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

    getByUsername(req, res){
        const {nome_usuario} = req.params
        usuariosModel.getByUsername(nome_usuario)        
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err.message))
    }

    logUsuario(req, res){
        const {email} = req.body
        const {senha} = req.body


        usuariosModel.logUsuario(email, senha)
        .then(usuario => res.status(200).json(usuario))
        .catch(err => res.status(401).json(err.message))
    }

    novoUsuario(req, res){
        const usuario = req.body
        const foto = req.file

        !foto?.path ? "" : usuario.foto = foto?.path


        usuariosModel.novoUsuario(usuario)
        .then(newUser => res.status(201).json(newUser))
        .catch(err => res.status(400).json(err.message))
    }

    async atualizarUsuario(req, res){
        const { id } = req.params
        const userJson = await usuariosModel.getById(id)
        const usuario = req.body
        const foto = req.file
        
        !foto?.path ? usuario.foto = "" : usuario.foto = foto?.path
        
        if(foto?.path && usuario.foto != "" && userJson?.foto){
            const userFoto = userJson[0].foto
            const path = userFoto.replace(/\\/g, "/")
            
            if(fs.existsSync(path)){
                fs.unlink(path, (err) => {
                    if(err) console.log(err)
                })
            }
        }




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
