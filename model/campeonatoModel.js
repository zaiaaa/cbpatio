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
        const sql = "SELECT * FROM Campeonato"
        return this.executarQuery(sql)
    }

    getByName(nome){
        const sql = "SELECT * FROM Campeonato WHERE nome LIKE ?"
        return this.executarQuery(sql, `%${nome}%`)
    }

    getById(id){
        const sql = "SELECT * FROM Campeonato WHERE id_campeonato = ?"
        return this.executarQuery(sql, id)
    }

    cadastrarCampeonato(body){
        const sql = "INSERT INTO Campeonato SET ?"
        return this.executarQuery(sql, body)
    }

    atualizarCampeonato(body, id){
        const sql = "UPDATE Campeonato SET ? WHERE id_campeonato = ?"
        return this.executarQuery(sql, [body, id])
    }

    deletarCampeonato(id){
        const sql = "DELETE FROM Campeonato WHERE id_campeonato = ?"
        return this.executarQuery(sql, id)
    }
}   

module.exports = new CamepeonatoModel