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

    getTimesPorCamp(id){
        const sql = `SELECT * FROM time_campeonato WHERE fk_id_campeonato = ?`
        return this.executarQuery(sql, id)
    }

    getTimesPorFase(fase){
        const sql = `SELECT * FROM time_campeonato WHERE fase = ?`
        return this.executarQuery(sql, fase)
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

}   

module.exports = new Time_campeonato