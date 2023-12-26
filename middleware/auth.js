const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(401).send({message: "Token obrigatório"})
    }

    try {
        const replace = token.replace("Bearer ", "")
        jwt.verify(replace, process.env.SECRET)
        next()
    } catch (e) {
        console.log(e)
    }
}

module.exports = verifyToken