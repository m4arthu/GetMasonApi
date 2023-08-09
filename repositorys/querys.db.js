
export const registerQuery = `insert into users(name,email,phone,local,password) 
      values($1,$2,$3,$4,$5)`

export const userValidation = `select * from users where email = $1`

export const existSession = `select * from sessions where "userId" = $1`
export const loginData = `select * from users where email = $1`
export const Login=`insert into sessions("userName",token,"userId") values ($1,$2,$3)`