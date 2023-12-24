const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const saltRound = 10;

class AuthModel{
    tryAuth(user, senha){
        return new Promise( async (res, rej) => {
            if(!(user & senha)){
                rej("Usuário e senha não informados.")
            }
            
            const salt = await bcrypt.genSalt(saltRound)
            const hash = await bcrypt.hash(process.env.senha, salt)

            const usuarioPraLogin = {usuario: process.env.USER, senha: hash}

            if(!user){
                rej("Usuário e/ou senha não não existem")
            }

            const isCorrectPassword = bcrypt.compare(senha, hash)

            if(user && user == usuarioPraLogin.usuario && isCorrectPassword){
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