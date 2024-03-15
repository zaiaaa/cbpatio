const authModel = require('../model/auth')

class authController{
    Auth(user, senha){
        return authModel.tryAuth(user, senha)
    }

    AuthToken(req, res){
        const {token} = req.params
        
        authModel.checkToken(token)
        .then(login => res.status(201).json(login))
        .catch(err => res.status(400).json(err))
    }
}

module.exports = new authController()