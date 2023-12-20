const conn = require('../inc/conexao')

class UsuariosModel{
    executarQuery(sql, parametros=""){
        return new Promise((res, rej) => {
            conn.query(sql, parametros, (err, resp) => {
                if(err){
                    console.log('erro -> ', e)
                    rej(e)
                }
                res(resp)
            })
        })
    }
    
    get(){
        const sql = "SELECT * FROM usuarios"
        return this.executarQuery(sql)
    }
}

module.exports = new UsuariosModel