const conn = require('../inc/conexao')

class time_usuario{
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
        const sql = "SELECT * FROM time_usuario"
        this.executarQuery(sql)
    }
}   

module.exports = new time_usuario