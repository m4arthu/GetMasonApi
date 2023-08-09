import { loginData, registerQuery, userValidation,Login, existSession } from "../repositorys/querys.db.js"
import {db} from  "../database/database.connection.js"
import {v4 as uuid} from "uuid"
export const  register = async(req,res) => {
  const { name,email,phone,local,password} = req.body
  try {
      let userExist = await db.query(userValidation,[email])
      if(userExist.rowCount > 0){
        res.status(409).send("email ja existe")
        return
      }
      await db.query(registerQuery,[name,email,phone,local,password])
       res.sendStatus(201)
     
  } catch(e){
    console.log(e)
    res.status(500).send("pau no server")
  }
}

export const login = async(req,res) => {
  const {email,password} = req.body
  try {
    const userData = await db.query(loginData,[email])
    if(userData.rowCount === 0){
      res.status(404).send("email não  registrado")
      return
    }
    if(password !== userData.rows[0].password){
      res.status(401).send("senha inválida")
    }
    const name = userData.rows[0].name
    const userId  = userData.rows[0].id
    const token = uuid(userId)
    const sessionExist = await db.query(existSession,[userId])
    if(sessionExist.rowCount > 0){
      res.send(sessionExist.rows[0].token)
      return
    }
    await db.query(Login,[name,token,userId])
    res.send(token)
  } catch(e){
      console.log(e)
      res.status(500).send("deu pau no  server!!")
  }
}

