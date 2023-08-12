
export const registerQuery = `insert into users(name,email,phone,local,password) 
      values($1,$2,$3,$4,$5)`
export const userValidation = `select * from users where email = $1`

export const existSession = `select * from sessions where "userId" = $1`
export const loginData = `select * from users where email = $1`
export const Login=`insert into sessions("userName",token,"userId") values ($1,$2,$3)`

export  const  tokenValidation = `select * from  sessions where token = $1`
export const  postServiceQuery = `insert into services("userId", image, title, price, descripition, avaible,phone)
values ($1,$2,$3,$4,$5,$6,$7)`
export const getServicesQuery = "select * from  services"
export const getMyServicesQuery  = `select * from services where "userId" = $1 `
export const putMyServicesQuery = `update services set avaible = $1 where id=$2`
export  const deleteServiceQuery = `delete from services where id = $1`
export const serviceQuery = "select * from services  where id=$1"