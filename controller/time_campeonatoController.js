const modelTimeCampeonato = require('../model/time_campeonatoModel')

class ControllerTimeCampeonato{
    novoTimeCampeonato(req, res){
        const newTeam = req.body
        //Deve conter: fk_id_time, fk_id_campeonato, fase (oitavas, quartas, semis etc.) e jogo da chave em que ele se encontra.
        modelTimeCampeonato.novoTime_campeonato(newTeam)
        .then(time_campeonato => res.status(201).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    getTimes_campeonato(req, res){
        modelTimeCampeonato.getTimes()
        .then(time_campeonato => res.status(200).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    alteraTime_campeonato(req, res){
        const time_campeonatoAlterado = req.body 
        const {id} = req.params

        modelTimeCampeonato.alterarTime_campeonato(time_campeonatoAlterado, id)
        .then((time_campeonato) => (res.status(201).json(time_campeonato)))
        .catch((err) => (res.status(400).json(err)))
    }

    deletarTime_campeonato(req, res){
        const {id} = req.params

        modelTimeCampeonato.deletarTimeCampeonato(id)
        .then(deleted => res.status(200).json(deleted))
        .catch(err => res.status(400).json(err))
    }
}

module.exports = new ControllerTimeCampeonato()