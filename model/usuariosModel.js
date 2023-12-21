const conn = require('../inc/conexao')

class UsuariosModel{
    executarQuery(sql, parametros=""){
        return new Promise((res, rej) => {
            conn.query(sql, parametros, (err, resp) => {
                if(err){
                    console.log('erro -> ', err.message)
                    rej(err)
                }
                res(resp)
            })
        })
    }
    
    get(){
        const sql = "SELECT * FROM usuario"
        return this.executarQuery(sql)
    }
}

module.exports = new UsuariosModel