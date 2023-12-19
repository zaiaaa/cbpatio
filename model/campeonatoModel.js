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
        const sql = "SELECT * FROM campeonato"
        return this.executarQuery(sql)
    }

    getByName(nome){
        const sql = "SELECT * FROM campeonato WHERE nome = ?"
        return this.executarQuery(sql, nome)
    }

}

module.exports = new CamepeonatoModel