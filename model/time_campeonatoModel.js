const conn = require('../inc/conexao')

class Time_campeonato{
    executarQuery(sql, parametros=""){
        return new Promise((resolve, rejects) => {
            conn.query(sql, parametros, (err, resp) => {
                if(err){
                    console.log('Erro na query -> ', err)
                    rejects(err)
                }

                resolve(resp)
            })
        })
    }

    getTimes(){
        const sql = `SELECT id_time_campeonato,
         t.id_time as id_time, t.nome as nome_time,
          t.fk_id_capitao as id_capitao,
           u.nome_usuario as nick_capitao,
            fk_id_campeonato as id_campeonato,
             c.nome as nome_campeonato,
              c.jogadores as num_jogadores_camp,
               tc.fase as fase_atual,
                tc.jogo as jogo_atual 
                FROM time_campeonato tc INNER JOIN time t ON tc.fk_id_time = t.id_time 
                INNER JOIN campeonato c ON tc.fk_id_campeonato = c.id_campeonato 
                INNER JOIN usuario u on t.fk_id_capitao = u.id_usuario`

        return this.executarQuery(sql)
    }

    getNomeTime(id){
        const sql = `SELECT id_time_campeonato,
        t.id_time as id_time,
        t.nome as nome_time,
        tc.fase as fase,
           fk_id_campeonato as id_campeonato
               FROM time_campeonato tc INNER JOIN time t ON tc.fk_id_time = t.id_time 
               INNER JOIN campeonato c ON tc.fk_id_campeonato = c.id_campeonato 
               INNER JOIN usuario u on t.fk_id_capitao = u.id_usuario WHERE id_time = ? ORDER BY id_time_campeonato DESC LIMIT 1`

        return this.executarQuery(sql, id)
    }

    getTimesPorCamp(id){
        const sql = `
        SELECT id_time_campeonato, fk_id_time, fk_id_campeonato, nome, fase, jogo, chave FROM time_campeonato tc
        INNER JOIN time t ON t.id_time = tc.fk_id_time  
        WHERE fk_id_campeonato = 1`
        return this.executarQuery(sql, id)
    }

    getTimesPorFase(fase, idCamp){
        const sql = `
        SELECT * FROM time_campeonato tc
        INNER JOIN time t ON tc.fk_id_time = t.id_time 
        WHERE fase = ? 
        AND fk_id_campeonato = ?
        `
        return this.executarQuery(sql, [fase, idCamp])
    }

    getTimesPorChave(chave, idCamp, fase){
        const sql = `SELECT * FROM time_campeonato tc
        INNER JOIN time t
        ON tc.fk_id_time = t.id_time 
        WHERE chave = ?
        AND fk_id_campeonato = ? 
        AND fase = ? 
        ORDER BY jogo`
        return this.executarQuery(sql, [chave, idCamp, fase])
    }

    getEliminados(jogo, idCampeonato, faseAtual, faseAnterior, chave){
        const sql = `
        SELECT *
        FROM time_campeonato AS tco
        WHERE jogo = ?
          AND fk_id_campeonato = ?
          AND fase = ?
          AND chave = ?
          AND NOT EXISTS (
              SELECT 1
              FROM time_campeonato AS tcq
              WHERE tcq.fk_id_campeonato = ?
                AND tcq.fase = ?
                AND tcq.chave = ?
                AND tcq.fk_id_time = tco.fk_id_time
          )`

          console.log(sql)

          return this.executarQuery(sql, [jogo, idCampeonato, faseAnterior, chave, idCampeonato, faseAtual, chave])
    }

    novoTime_campeonato(newTeam){
        const sql = "INSERT INTO time_campeonato SET ?"

        return this.executarQuery(sql, newTeam)
    }

    alterarTime_campeonato(newTeam, id){
        const sql = "UPDATE time_campeonato SET ? WHERE id_time_campeonato = ?"

        return this.executarQuery(sql, [newTeam, id])
    }

    deletarTimeCampeonato(id){
        const sql = "DELETE FROM time_campeonato WHERE id_time_campeonato = ?"

        return this.executarQuery(sql, id)
    }

    resetarFase(fase, idCamp){
        const sql = `DELETE FROM time_campeonato WHERE fase = ? AND fk_id_campeonato = ?`

        return this.executarQuery(sql, [fase, idCamp])
    }

}   

module.exports = new Time_campeonato