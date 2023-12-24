const conn = require('../inc/conexao')
const bcrypt = require('bcrypt');
const { stack } = require('../routes/timeRotas');

const saltRound = 10;


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

    async logUsuario(email, senha){
        const sql = "SELECT * FROM usuario WHERE email = ?"
        const usuario = await this.executarQuery(sql, [email])
        //console.log(usuario[0].senha)
        const senhaBanco = usuario[0].senha
        const isCorrectPassword = await bcrypt.compare(senha, senhaBanco)

        if (isCorrectPassword) {
            return usuario[0];
        } else {
            return 'senha errada';
        }
        //TODO refatorar essa bomba
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