import express from  "express"
import { validateSchema } from "../middleweres/validateSchema.js"
import {registerSchema,loginSchema} from "../schemas/schemas.js"
import dotenv from "dotenv"
import { login, register } from "../controllers/controllers.js"
const app = express()
dotenv.config()
app.post("/register",validateSchema(registerSchema),register)
app.post("/login",validateSchema(loginSchema),login)
export const router = app