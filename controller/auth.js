const authModel = require('../model/auth')

class authController{
    Auth(user, senha){
        return authModel.tryAuth(user, senha)
    }
}

module.exports = new authController()