const conn = require('../inc/conexao')

class Time_usuario{
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

    get(){
        const sql = `SELECT tu.id_time_usuario as time_usuarioReg, t.id_time as idTime, t.nome AS NomeTime, u.id_usuario as idUser, u.nome_usuario AS NomeUsuario
        FROM time_usuario tu
        INNER JOIN time t ON tu.fk_id_time = t.id_time
        INNER JOIN usuario u ON tu.fk_id_usuario = u.id_usuario;`
        return this.executarQuery(sql)
    }

    novoUsuarioNoTime(newUserTeam){
        const sql = `INSERT INTO time_usuario SET ?`
        return this.executarQuery(sql, newUserTeam)
    }

    convidarUsuarioParaTime(invite){
        const sql = `INSERT INTO solicitacao_time_usuario SET ?`
        return this.executarQuery(sql, invite)
    }

    aceitaConvite(id_solicitacao, aceitou){
        const sql = `UPDATE solicitacao_time_usuario SET ? WHERE id_solicitacao = ?`
        return this.executarQuery(sql, [aceitou, id_solicitacao])
    }

    async deletarUsuario_time(id_time, id_user){
        const sql1 = "SELECT id_time_usuario FROM time_usuario WHERE fk_id_time = ? AND fk_id_usuario = ?"
        console.log(id_time, id_user)
        const jogador = await this.executarQuery(sql1, [id_time, id_user])

        const jogadorBanido = jogador[0].id_time_usuario
        const sql = `DELETE FROM time_usuario WHERE id_time_usuario = ?`
        return this.executarQuery(sql, jogadorBanido)
    }


}   

module.exports = new Time_usuario