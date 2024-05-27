const campeonatoModel = require('../model/campeonatoModel')
const fs = require('fs')

class CampeonatoController {
    get(req, res) {
        const listagemDeCampeonatos = campeonatoModel.get()

        listagemDeCampeonatos
            .then(campeonatos => res.status(200).json(campeonatos))
            .catch(err => res.status(400).json(err.message))
    }

    getByName(req, res) {
        const { nome } = req.params
        if(!nome) return res.status(400).json({message: "Nome não informado!"})

        const listagemDeCampeonatosPeloNome = campeonatoModel.getByName(nome)

        listagemDeCampeonatosPeloNome
            .then(campeonatos => res.status(200).json(campeonatos))
            .catch(err => res.status(400).json(err.message))

    }

    getById(req, res){
        const {id} = req.params 
        campeonatoModel.getById(id)
        .then(campeonatos => res.status(200).json(campeonatos))
        .catch(err => res.status(400).json(err.message))
    }

    cadastrarCampeonato(req, res) {
        const body = req.body
        const foto = req.file
        !foto?.path ? "" : body.foto = foto.path
        
        
        const campCadastrado = campeonatoModel.cadastrarCampeonato(body)
        campCadastrado
            .then((campCadastrado) => (res.status(201).json(campCadastrado)))
            .catch((err) => (res.status(400).json(err)))
    }

    async atualizarCampeonato(req, res) {
        const { id } = req.params
        const campJson = await campeonatoModel.getById(id)
        const body = req.body
        const foto = req.file
        
        !foto?.path ? body.foto = campJson[0].foto : body.foto = foto.path

        if(foto?.path && body.foto != "" && campJson?.foto){
            const campFoto = campJson[0].foto
            const path = campFoto.replace(/\\/g, "/")
            if(fs.existsSync(path)){
                fs.unlink(path, (err) => {
                    if(err) console.log(err)
                })
            }
        }
        
        


        const campAtualizado = campeonatoModel.atualizarCampeonato(body, id)
        campAtualizado
            .then((campAtualizado) => (res.status(201).json(campAtualizado)))
            .catch((err) => (res.status(400).json(err)))
    }

    deletarCampeonato(req, res) {
        const { id } = req.params

        const campDeletado = campeonatoModel.deletarCampeonato(id)

        campDeletado
            .then((campDeletado) => (res.status(204).json(campDeletado)))
            .catch((err) => (res.status(400).json(err)))
    }
}

module.exports = new CampeonatoController()


//mais um test
