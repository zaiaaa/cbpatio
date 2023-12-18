const conn = require('../inc/conexao')

class CamepeonatoModel{
    get(){
        const sql = "SELECT * FROM campeonato"
        return new Promise((res, rej) => {
            conn.query(sql, {}, (err, resp) => {
                if(err){
                    console.log('erro na listagem -> ', err)
                    rej(err)
                }
                res(resp)
            })
        })
    }

}

module.exports = new CamepeonatoModel