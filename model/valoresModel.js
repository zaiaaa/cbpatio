const conn = require('../inc/conexao')

class ValoresModel{
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

    getValores(id){
        const sql = "SELECT SUM(valor_pagamento) as valor_total FROM pagamentos WHERE fk_id_campeonato = ?"
        return this.executarQuery(sql, id)
    }

    getValoresTotal(){
        const sql = `SELECT SUM(valor_pagamento) as valor_arrecadado, AVG(valor_pagamento) as media FROM pagamentos`

        return this.executarQuery(sql)
    }

    getPremiacaoTotal(){
        const sql = `SELECT SUM(premiacao) as premiacao FROM campeonato`

        return this.executarQuery(sql)
    }
}


module.exports = new ValoresModel