import { db }from "../database/database.connection.js"
import { tokenValidation } from "../repositorys/querys.db.js"

export const tokenValidate =async(req,res,next) => {
    let token = req.headers.authorization
    if(!token){
        res.status(401).send("token não  encontrado")
        return
    }
    token = token.replaceAll("Bearer ","")
    console.log(token)
    try {
        const  tokenSession = await db.query(tokenValidation,[token])
        if(tokenSession.rowCount === 0){
            res.status(401).send("usuario invalido faça login novamente!!")
            return
        } else {
            next()
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send("erro no  servidor!!")
    } 
}