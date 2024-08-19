const conn = require('../inc/conexao')

class CamepeonatoModel{
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
        const sql = "SELECT * FROM campeonato WHERE ativo='s'"
        return this.executarQuery(sql)
    }

    getByName(nome){
        const sql = "SELECT * FROM campeonato WHERE nome LIKE ?"
        return this.executarQuery(sql, `%${nome}%`)
    }

    getById(id){
        const sql = "SELECT * FROM campeonato WHERE id_campeonato = ?"
        return this.executarQuery(sql, id)
    }

    cadastrarCampeonato(body){
        const sql = "INSERT INTO campeonato SET ?"
        return this.executarQuery(sql, body)
    }

    atualizarCampeonato(body, id){
        const sql = "UPDATE campeonato SET ? WHERE id_campeonato = ?"
        return this.executarQuery(sql, [body, id])
    }

    async deletarCampeonato(id){
        const sql1 = "DELETE FROM pagamentos WHERE fk_id_campeonato = ?"
        const sql2 = "DELETE FROM time_campeonato WHERE fk_id_campeonato = ?"
        await this.executarQuery(sql1, id)
        await this.executarQuery(sql2, id)    
    
        const sql = "DELETE FROM campeonato WHERE id_campeonato = ?"
        
        
        
        return this.executarQuery(sql, id)
    }
}   

module.exports = new CamepeonatoModel