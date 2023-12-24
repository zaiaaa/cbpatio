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
                process.env.SENHA
                )
                res(token)
            }else{
                rej("Email ou senha incorretos!")
            }
        })
    }
}

module.exports = new AuthModel