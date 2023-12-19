const campeonatoModel = require('../model/campeonatoModel')

class CampeonatoController {
    get(req, res) {
        const listagemDeCampeonatos = campeonatoModel.get()

        listagemDeCampeonatos
            .then(campeonatos => res.status(200).json(campeonatos))
            .catch(err => res.status(400).json(err.message))
    }

    getByName(req, res, nome) {
        const listagemDeCampeonatosPeloNome = campeonatoModel.getByName(nome)

        listagemDeCampeonatosPeloNome
            .then(campeonatos => res.status(200).json(campeonatos))
            .catch(err => res.status(400).json(err.message))

    }

    cadastrarCampeonato(req, res) {
        const body = req.body
        console.log(body)
        const campCadastrado = campeonatoModel.cadastrarCampeonato(body)

        campCadastrado
            .then((campCadastrado) => (res.status(201).json(campCadastrado)))
            .catch((err) => (res.status(400).json(err)))
    }
}

module.exports = new CampeonatoController()