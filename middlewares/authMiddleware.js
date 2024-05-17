require("dotenv").config({path: "./config.env"})
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    //Pega o token usado
    if(!req.headers.authorization){
        return res.status(401).send("Acesso negado. Token de autorização não fornecido.")
    }

    const token = req.headers.authorization.replace("Bearer ", "");

    if(!token){
        return res.status(401).send("Acesso negado.")
    }
    //Verifica se o token é um token do JWT valido, se valido ele passa para o proximo middleware
        try{
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            req.existingEmail = verified
            next();
        }
        catch(error){
            res.status(400).send("Token Invalido")
        }
    
}

module.exports = authMiddleware