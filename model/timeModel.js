const conn = require('../inc/conexao')

class TimeModel{
    executarQuery(sql, parametros=""){
        return new Promise((res, rej) => {
            conn.query(sql, parametros, (err, resp) => {
                if(err){
                    console.log('erro -> ', err)
                    rej(err)
                }
                res(resp)
            })
        })
    }

    get(){
        const sql = "SELECT * FROM time"
        return this.executarQuery(sql)
    }

    getByName(nome){
        const sql = "SELECT * FROM time WHERE nome LIKE ?"
        return this.executarQuery(sql, `%${nome}%`)
    }

    getById(id){
        const sql = "SELECT * FROM time WHERE id_time = ?"
        return this.executarQuery(sql, id)
    }

    getByCaptain(id_captain){
        const sql = "SELECT * FROM time WHERE fk_id_capitao = ?"
        return this.executarQuery(sql, id_captain)
    }

    async novoTime(time){
        //quando gerar um novo time, adicionar todos os integrantes na tabela usuario time
        console.log(time)
        const sql = "INSERT INTO time SET ?"

        const sqlVerifica = `SELECT * FROM time WHERE nome = ?`
        const existsName = await this.executarQuery(sqlVerifica, time.nome)

        const sqlTimesJaCriado = "SELECT * FROM time WHERE fk_id_capitao = ?"
        const times = await this.executarQuery(sqlTimesJaCriado, time.fk_id_capitao)

        console.log(times.length)
        if(existsName.length > 0){
            return {message: "Este nome de time já está cadastrado."}
        }

        if(times.length >= 5){
            return {message: "Você passou do limite de criação de 5 times!"}
        }

        return this.executarQuery(sql, time)
    }

    alterarTime(time, id){
        const sql = "UPDATE time SET ? WHERE id_time = ?"
        return this.executarQuery(sql, [time, id])
    }

    async deletarTime(id){
        //excluindo primeiro o time das tabelas filha a tabela time, para que não haja erro de parent key.
        const sql1 = "DELETE FROM time_usuario WHERE fk_id_time = ?"
        await this.executarQuery(sql1, id)
        const sql2 = "DELETE FROM solicitacao_time_usuario WHERE fk_id_time = ?"
        await this.executarQuery(sql2, id)

        const sql = "DELETE FROM time WHERE id_time = ?"
        return this.executarQuery(sql, id)
    }
}


module.exports = new TimeModel