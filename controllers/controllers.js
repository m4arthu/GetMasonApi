import { loginData, registerQuery, userValidation, Login, existSession, tokenValidation, postServiceQuery, getServicesQuery, getMyServicesQuery, putMyServicesQuery, serviceQuery, deleteServiceQuery } from "../repositorys/querys.db.js"
import { db } from "../database/database.connection.js"
import { v4 as uuid } from "uuid"
export const register = async (req, res) => {
  const { name, email, phone, local, password } = req.body
  try {
    let userExist = await db.query(userValidation, [email])
    if (userExist.rowCount > 0) {
      res.status(409).send("email ja existe")
      return
    }
    await db.query(registerQuery, [name, email, phone, local, password])
    res.sendStatus(201)

  } catch (e) {
    console.log(e)
    res.status(500).send("pau no server")
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const userData = await db.query(loginData, [email])
    if (userData.rowCount === 0) {
      res.status(404).send("email não  registrado")
      return
    }
    if (password !== userData.rows[0].password) {
      res.status(401).send("senha inválida")
    }
    const name = userData.rows[0].name
    const userId = userData.rows[0].id
    const token = uuid(userId)
    const sessionExist = await db.query(existSession, [userId])
    if (sessionExist.rowCount > 0) {
      res.send(sessionExist.rows[0].token)
      return
    }
    await db.query(Login, [name, token, userId])
    res.send(token)
  } catch (e) {
    console.log(e)
    res.status(500).send("deu pau no  server!!")
  }
}

export const postService = async (req, res) => {
  let token = req.headers.authorization
  token = token.replace("Bearer ", "")
  const { imageUrl, title, price, description, avaible, phone } = req.body
  try {
    const userData = await db.query(tokenValidation, [token])
    const userId = userData.rows[0].userId
    await db.query(postServiceQuery, [userId, imageUrl, title, price, description, avaible, phone])
    res.sendStatus(201)
  } catch (e) {
    console.log(e)
    res.status(500).send("erro na  requisição  ao  banco")
  }
}

export const getServices = async (req, res) => {
  try {
    const services = await db.query(getServicesQuery)
    res.send(services.rows)
  } catch (e) {
    console.log(e)
    res.status(500).send("erro na  requisição  ao  banco")
  }
}

export const getMyServices = async (req, res) => {
  let token = req.headers.authorization
  token = token.replace("Bearer ", "")
  try {
    const userData = await db.query(tokenValidation, [token])
    const services = await db.query(getMyServicesQuery, [userData.rows[0].userId])
    res.send(services.rows)
  } catch (e) {
    console.log(e)
    res.status(500).send("erro na  requisição  ao  banco")
  }
}

export const putMyServices = async (req, res) => {
  let token = req.headers.authorization
  token = token.replace("Bearer ", "")
  const {id} = req.params
  const {avaible} = req.body
  try {
    const userData = await db.query(tokenValidation, [token])
    const userId = userData.rows[0].userId
    const userHaveService = await db.query(`select * from  services where "userId" = $1`,[userId])
    if(userHaveService.rowCount == 0){
      res.status(404).send("você nõ possui este serviço!!")
      return
    }
    if(userId === userHaveService.rows[0].userId) {
      await db.query(putMyServicesQuery, [avaible,id])
      res.sendStatus(200)
      return
    } else {
      res.status(401).send("não  é possivel modificar serviçoes de outras pessoas")
    }
  } catch (e) {
    console.log(e)
    res.status(500).send("erro na  requisição  ao  banco")
  }
}

export const  deleteService = async (req,res) => {
  let  token  = req.headers.authorization
  let id = req.params.id
  token = token.replace("Bearer ","")
  console.log(token)
  try {
    const userDataSession = await db.query(tokenValidation,[token])
    const service = await db.query(serviceQuery,[id])
    if(userDataSession.rows[0].userId === service.rows[0].userId){
      await db.query(deleteServiceQuery,[id])
      res.sendStatus(200)
      return
    } else {
      res.status(401).send("Não  é possivel  deletar serviços  de  outro  usuário!!")
    }
  } catch(e){
    console.log(e)
    res.status(500).send("erro no  servidor tente mais tarde !!")
  }
}