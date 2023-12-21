const conn = require('../inc/conexao')
const bcrypt = require('bcrypt')

const saltRound = 10;
const initHash = 'iusehbghu923h4g23hnfas0ijd1h2ju1120';


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

    async novoUsuario(usuario){
        const sql = "INSERT INTO usuario SET ?"        
        const {senha} = usuario
        
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(senha, salt);

        usuario.senha = hash

        return this.executarQuery(sql, usuario)
    }
}


module.exports = new UsuariosModel