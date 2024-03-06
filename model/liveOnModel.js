const conn = require('../inc/conexao')

class Live_on{
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

    getLiveOn(){
        const sql = "SELECT live_on FROM live_on"        

        return this.executarQuery(sql)
    }

    alterLiveOn(id, liveOn){
        const sql = "UPDATE live_on SET ? WHERE id_liveon = ?"

        return this.executarQuery(sql, [liveOn, id])
    }

}   

module.exports = new Live_on