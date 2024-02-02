const conn = require('../inc/conexao')
const bcrypt = require('bcrypt');
const auth = require('./auth');

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

    getById(id){
        const sql = "SELECT * FROM usuario WHERE id_usuario = ?"
        return this.executarQuery(sql, id)
    }

    async logUsuario(email, senha){
        try{
            const sql = "SELECT * FROM usuario WHERE email = ?"
            const usuario = await this.executarQuery(sql, [email])
            console.log(usuario)
            if(usuario.length === 0){
                return "email e/ou senha estão incorretos"
            }
    
            //console.log(usuario[0].senha)
            const senhaBanco = usuario[0].senha
            const isCorrectPassword = await bcrypt.compare(senha, senhaBanco)
    
            if (isCorrectPassword) {
                return auth.tryAuthUser(usuario[0]);
            } else {
                return 'email e/ou senha estão incorretos';
            }
        }catch(e){
            return `Não foi possível completar seu login -> ${e}`
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

    async atualizarUsuario(usuario, id){
        const sql = "UPDATE usuario SET ? WHERE id_usuario = ?"     
        const { senha } = usuario
        
        if(senha){
            const salt = await bcrypt.genSalt(saltRound);
            const hash = await bcrypt.hash(senha, salt);
    
            usuario.senha = hash
        }
        

        return this.executarQuery(sql, [usuario, id])
    }

    deletarUsuario(id){
        const sql = "DELETE FROM usuario WHERE id_usuario =  ?"        

        return this.executarQuery(sql, id)
    }


}


module.exports = new UsuariosModel