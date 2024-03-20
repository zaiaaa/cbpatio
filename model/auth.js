const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const saltRound = 10;

class AuthModel{
    tryAuth(user, senha){
        return new Promise(async (res, rej) => {
            const salt = await bcrypt.genSalt(saltRound)
            const hash = await bcrypt.hash(process.env.SENHA, salt)

            if(!(user && senha)){
                rej("Usuário e senha não informados")
            }

            if(!user){
                rej("Usuário e/ou senha não não existem")
            }
            
            const usuarioPraLogin = {usuario: process.env.USER, senha: hash}

            const isCorrectPassword = await bcrypt.compare(senha, usuarioPraLogin.senha)

            if(user == usuarioPraLogin.usuario && isCorrectPassword){
                const token = jwt.sign({
                    user
                },
                process.env.SECRET
                )
                res(token)
            }else{
                rej("Email ou senha incorretos!")
            }
        })
    }

    checkToken(token){
        return new Promise((res, rej) => {
            try {
                const replace = token.replace("Bearer ", "")
                jwt.verify(replace, process.env.SECRET)
                res("Token OK")
            } catch (e) {
                res("Token Inválido")
            }
        })
    }

    tryAuthUser(user = {}){
        return new Promise(async (res, rej) => {
            try {
                console.log(user.id_usuario)

                if(!user){
                    rej("usuário ou senha não existem")
                }

                if(!user.email){
                    rej("usuário ou senha não existem")
                }

                if(user){
                    const token = jwt.sign({
                        id: user.id_usuario,
                        nome: user.nome_usuario,
                        email: user.email
                    },
                    
                    process.env.SECRET_LOG_USER,
                    {
                        expiresIn: "24h"
                    })

                    const headers = jwt.decode(token, process.env.SECRET_LOG_USER)
                    //se necessário, passamos o header
                    res(token)
                }else{
                    rej("Email ou senha incorretos!")
                }
            } catch (e) {
                if (e.name === 'TokenExpiredError') {
                    console.log('Token expirado');
                } else {
                console.error('Erro ao verificar o token:', e.message);
                }

                console.log('erro -> ', e.message)

                
            }
        })
    }
}

module.exports = new AuthModel
