const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({message: 'Acesso negado'})
    }

    try {
        const secret = process.env.secret

        jwt.verify(token, secret)

        next()
    } catch (error) {
        res.status(400).json({message: 'Token inválido'})
    }
}

module.exports = {
    verifyToken
};