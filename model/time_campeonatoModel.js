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
        WHERE fk_id_campeonato = ?`
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

    getEliminadosPorJogo(jogo, idCampeonato, faseAtual, faseAnterior, chave, chaveTarget){
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

          //console.log(sql)

          return this.executarQuery(sql, [jogo, idCampeonato, faseAnterior, chave, idCampeonato, faseAtual, chaveTarget])
    }

    getCapitao(id_camp){
        const sql = `SELECT DISTINCT t.id_time, u.nome as nome_usuario, u.celular, t.nome as nome_time, u.foto as foto FROM time_campeonato tc 
        INNER JOIN time t ON t.id_time = tc.fk_id_time
        INNER JOIN usuario u ON u.id_usuario = t.fk_id_capitao
        WHERE tc.fk_id_campeonato = ?
          `

          return this.executarQuery(sql, id_camp)
    }

    getCapitaoPorFase(id_camp, fase){
        const sql = `SELECT t.id_time, u.nome as nome_usuario, u.celular, t.nome as nome_time FROM time_campeonato tc 
        INNER JOIN time t ON t.id_time = tc.fk_id_time
        INNER JOIN usuario u ON u.id_usuario = t.fk_id_capitao
        WHERE tc.fk_id_campeonato = ? AND tc.fase = ?
          `

          return this.executarQuery(sql, [id_camp, fase])
    }

    getUserCampeao(id_user){
        const sql = `select * from time_campeonato tc
        INNER JOIN time_usuario tu 
        WHERE tc.fk_id_time = tu.fk_id_time 
        AND tc.fase = "campeao"
        AND tu.fk_id_usuario = ?
        `

        return this.executarQuery(sql, id_user)
    }

    getUserParticipacao(id_time, id_user){
        const sql = `select DISTINCT tc.fk_id_time, tu.fk_id_usuario
         from time_campeonato
          tc INNER JOIN time_usuario
           tu WHERE tu.fk_id_time = tc.fk_id_time 
           AND tc.fk_id_time = ? 
           AND tu.fk_id_usuario = ? 
           AND aconteceu = 's'`

         return this.executarQuery(sql, [id_time, id_user])
    }

    novoTime_campeonato(newTeam){
        const sql = "INSERT INTO time_campeonato SET ?"

        return this.executarQuery(sql, newTeam)
    }

    getTeamUserActive(id_user){
        const sql = `SELECT tc.chave, tc.data_hora,
        tc.fase, tc.fk_id_campeonato, tc.fk_id_time,
        tc.jogo, c.foto, c.nome as nome_camp, c.modalidade, c.limite,
        c.premiacao, t.nome as nome_time, t2.nome as nome_time_vs, c.id_campeonato, c.foto
        FROM time_campeonato tc
        
        LEFT JOIN time_usuario tu ON tc.fk_id_time = tu.fk_id_time 

        LEFT JOIN time t ON t.id_time = tc.fk_id_time 

        LEFT JOIN campeonato c ON c.id_campeonato = tc.fk_id_campeonato 
        
        LEFT JOIN time_campeonato tc2 ON tc.chave = tc2.chave AND tc.fase = tc2.fase AND tc.jogo = tc2.jogo AND tc.id_time_campeonato != tc2.id_time_campeonato AND tc.fk_id_campeonato = tc2.fk_id_campeonato
        LEFT JOIN time t2 ON tc2.fk_id_time = t2.id_time
        WHERE tu.fk_id_usuario = ? AND
        tc.chave != "" 
        AND
        tc.aconteceu != 's' `

        return this.executarQuery(sql, id_user)
    }

    getCampeaoActiveByUser(id_user){
        const sql = `SELECT tc.chave, tc.data_hora,
        tc.fase, tc.fk_id_campeonato, tc.fk_id_time,
        tc.jogo, c.foto, c.nome as nome_camp, c.modalidade, c.limite,
        c.premiacao, t.nome as nome_time, t2.nome as nome_time_vs, c.id_campeonato, c.foto
        FROM time_campeonato tc
        
        LEFT JOIN time_usuario tu ON tc.fk_id_time = tu.fk_id_time 

        LEFT JOIN time t ON t.id_time = tc.fk_id_time 

        LEFT JOIN campeonato c ON c.id_campeonato = tc.fk_id_campeonato 
        
        LEFT JOIN time_campeonato tc2 ON tc.chave = tc2.chave AND tc.fase = tc2.fase AND tc.jogo = tc2.jogo AND tc.id_time_campeonato != tc2.id_time_campeonato AND tc.fk_id_campeonato = tc2.fk_id_campeonato
        LEFT JOIN time t2 ON tc2.fk_id_time = t2.id_time
        WHERE tu.fk_id_usuario = ? AND tc.fase = 'campeao'`

        return this.executarQuery(sql, id_user)
    }

    getTeamInactiveElim(id_user){
        const sql = `SELECT tc.fase as eliminado_em, 
        tc.fk_id_campeonato, tc.fk_id_time, c.foto, c.nome as nome_camp, t.nome,
        tc.data_hora as data_hora
    FROM 
        time_campeonato tc
    LEFT JOIN 
        time_usuario tu ON tc.fk_id_time = tu.fk_id_time 
    LEFT JOIN 
        time t ON t.id_time = tc.fk_id_time 
    LEFT JOIN 
        campeonato c ON c.id_campeonato = tc.fk_id_campeonato 
    WHERE 
        tu.fk_id_usuario = ? 
        AND tc.chave = '' 
        AND tc.fase != 'campeao'
        AND tc.fase != '';
        `
        
        return this.executarQuery(sql, id_user)
    }

    getWaitingTeams(id_user){
        const sql = `SELECT tc.chave, tc.data_hora,
        tc.fase, tc.fk_id_campeonato, tc.fk_id_time,
        tc.jogo, c.foto, c.nome as nome_camp, c.modalidade, c.limite,
        c.premiacao, t.nome as nome_time, c.id_campeonato, c.foto, c.data as hora_camp_pre_definido
        FROM time_campeonato tc
        
        LEFT JOIN time_usuario tu ON tc.fk_id_time = tu.fk_id_time 

        LEFT JOIN time t ON t.id_time = tc.fk_id_time 

        LEFT JOIN campeonato c ON c.id_campeonato = tc.fk_id_campeonato 
        
        WHERE tu.fk_id_usuario = ? AND tc.fase = '' AND tc.jogo = '' AND tc.aconteceu = ""`

        return this.executarQuery(sql, id_user)
    }

    getUserInCampeonato(id_camp, id_user){
        const sql = `
        SELECT t.nome, tu.fk_id_usuario FROM time_campeonato tc
        LEFT JOIN time t ON tc.fk_id_time = id_time
        LEFT JOIN time_usuario tu ON t.id_time = tu.fk_id_time 
        
        WHERE tc.fk_id_campeonato = ? AND tu.fk_id_usuario = ?`

        return this.executarQuery(sql, [id_camp, id_user])
    }

    getDateByIdAndFase(id_time, id_camp, fase){
        const sql = `SELECT data_hora FROM time_campeonato tc
            WHERE fk_id_time = ? AND fk_id_campeonato = ? AND fase = ?;
        `
        return this.executarQuery(sql, [id_time, id_camp, fase])
    }

    setGameDateTime(data_hora, idCampeonato, jogo, fase, chave ){
        const sql = `UPDATE time_campeonato SET ? 
        WHERE fk_id_campeonato = ?
        AND jogo = ?
        AND fase = ?
        AND chave = ?
        `

        return this.executarQuery(sql, [data_hora, idCampeonato, jogo, fase, chave])
    }

    alterarTime_campeonato(newTeam, id){
        const sql = "UPDATE time_campeonato SET ? WHERE id_time_campeonato = ?"

        return this.executarQuery(sql, [newTeam, id])
    }

    alterarChave(team, id_camp, fase){
        const sql = "UPDATE time_campeonato SET ? WHERE fk_id_campeonato = ? AND fase = ?"
        
        return this.executarQuery(sql, [team, id_camp, fase])
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