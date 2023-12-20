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
}

module.exports = new UsuariosModel