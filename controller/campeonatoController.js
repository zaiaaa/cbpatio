const campeonatoModel = require('../model/campeonatoModel')

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

    cadastrarCampeonato(req, res) {
        const body = req.body
        const campCadastrado = campeonatoModel.cadastrarCampeonato(body)

        campCadastrado
            .then((campCadastrado) => (res.status(201).json(campCadastrado)))
            .catch((err) => (res.status(400).json(err)))
    }

    atualizarCampeonato(req, res) {
        const body = req.body
        const { id } = req.params

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