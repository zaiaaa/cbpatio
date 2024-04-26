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

    getTimes_porCampeonato(req, res){
        const {id} = req.params
        modelTimeCampeonato.getTimesPorCamp(id)
        .then(time_campeonato => res.status(200).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    getTimesPorFase(req, res){
        const {fase, idCamp} = req.params
        modelTimeCampeonato.getTimesPorFase(fase, idCamp)
        .then(time_campeonato => res.status(200).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    getTimesPorChave(req, res){
        const {chave, idCamp, fase} = req.params

        modelTimeCampeonato.getTimesPorChave(chave, idCamp, fase)
        .then(time_campeonato => res.status(200).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    getNomeTime(req, res){
        const {id} = req.params

        modelTimeCampeonato.getNomeTime(id)
        .then(time_campeonato => res.status(200).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    getCampeaoActiveByUser(req, res){
        const {id_user} = req.params

        modelTimeCampeonato.getCampeaoActiveByUser(id_user)
        .then(time_campeonato => res.status(200).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    getInactiveTeamsElim(req, res){
        const {id_user} = req.params

        modelTimeCampeonato.getTeamInactiveElim(id_user)
        .then(time_campeonato => res.status(200).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    getEliminadosPorJogo(req, res){
        const {id} = req.params
        const {jogo, faseAnterior, faseAtual, chave, chaveTarget} = req.query

        modelTimeCampeonato.getEliminadosPorJogo(jogo, id, faseAtual, faseAnterior, chave, chaveTarget)
        .then(time_campeonato => res.status(200).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    getWaitingTeams(req, res){
        const {id_user} = req.params
        
        modelTimeCampeonato.getWaitingTeams(id_user)
        .then(time_campeonato => res.status(200).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    getUserInCampeonato(req, res){
        const { id_user, id_camp } = req.params

        modelTimeCampeonato.getUserInCampeonato(id_camp, id_user)
        .then(time_campeonato => res.status(200).json(time_campeonato))
        .catch(err => res.status(400).json(err.message))
    }

    setGameDateTime(req, res){
        const {idCamp, jogo, fase, chave} = req.params
        const data_hora = req.body

        modelTimeCampeonato.setGameDateTime(data_hora, idCamp, jogo, fase, chave)
        .then((time_campeonato) => (res.status(201).json(time_campeonato)))
        .catch((err) => (res.status(400).json(err)))
    }

    getCapitao(req, res){
        const {id_camp} = req.params

        modelTimeCampeonato.getCapitao(id_camp)
        .then((time_campeonato) => (res.status(200).json(time_campeonato)))
        .catch((err) => (res.status(400).json(err)))
    }

    getCapitaoPorFase(req, res){
        const {id_camp, fase} = req.params

        modelTimeCampeonato.getCapitaoPorFase(id_camp, fase)
        .then((time_campeonato) => (res.status(200).json(time_campeonato)))
        .catch((err) => (res.status(400).json(err)))
    } 

    getTeamsUserActive(req, res){
        const {id_user} = req.params

        modelTimeCampeonato.getTeamUserActive(id_user)
        .then((time_campeonato) => (res.status(200).json(time_campeonato)))
        .catch((err) => (res.status(400).json(err)))
    }

    getDateByIdAndFase(req, res){
        const {id_time, id_camp, fase} = req.params

        modelTimeCampeonato.getDateByIdAndFase(id_time, id_camp, fase)
        .then((time_campeonato) => (res.status(200).json(time_campeonato)))
        .catch((err) => (res.status(400).json(err)))
    }

    alteraTime_campeonato(req, res){
        const time_campeonatoAlterado = req.body 
        const {id} = req.params

        modelTimeCampeonato.alterarTime_campeonato(time_campeonatoAlterado, id)
        .then((time_campeonato) => (res.status(201).json(time_campeonato)))
        .catch((err) => (res.status(400).json(err)))
    }

    alterarChave(req, res){
        const {id_camp, fase} = req.params
        const team = req.body

        modelTimeCampeonato.alterarChave(team, id_camp, fase)
        .then((time_campeonato) => (res.status(201).json(time_campeonato)))
        .catch((err) => (res.status(400).json(err)))
    }

    deletarTime_campeonato(req, res){
        const {id} = req.params

        modelTimeCampeonato.deletarTimeCampeonato(id)
        .then(deleted => res.status(200).json(deleted))
        .catch(err => res.status(400).json(err))
    }

    resetarFase(req, res){
        const {fase, idCamp} = req.params

        modelTimeCampeonato.resetarFase(fase, idCamp)
        .then(deleted => res.status(200).json(deleted))
        .catch(err => res.status(400).json(err))
    }
}

module.exports = new ControllerTimeCampeonato()