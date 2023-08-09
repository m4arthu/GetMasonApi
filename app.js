import express, { json } from  "express"
import cors from "cors"
import { router } from "./routers/router.js"
const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(json())
app.use(router)

app.listen(port, ()=> {
    console.log(`Server is runing on ${port}`)
}) 