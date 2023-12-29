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

    novoTime(time){
        const sql = "INSERT INTO time SET ?"
        return this.executarQuery(sql, time)
    }

    alterarTime(time, id){
        const sql = "UPDATE time SET ? WHERE id_time = ?"
        return this.executarQuery(sql, [time, id])
    }

    deletarTime(id){
        const sql = "DELETE FROM time WHERE id_time = ?"
        return this.executarQuery(sql, id)
    }
}


module.exports = new TimeModel