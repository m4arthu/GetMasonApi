import express from  "express"
import { validateSchema } from "../middleweres/validateSchema.js"
import {
    registerSchema,
    loginSchema,
     serviceSchema, 
     putServiceSchema
    } from "../schemas/schemas.js"
import dotenv from "dotenv"
import { 
    login, 
    register,
    postService,
    getServices,
    getMyServices,
    putMyServices,
    deleteService
} from "../controllers/controllers.js"

import { tokenValidate } from "../middleweres/tokenValidate.js"

const app = express()
dotenv.config()
app.post("/register",validateSchema(registerSchema),register)
app.post("/login",validateSchema(loginSchema),login)
app.post("/service",tokenValidate,validateSchema(serviceSchema),postService)
app.get("/services",getServices)
app.get("/services/me",tokenValidate,getMyServices)
app.put("/services/:id",tokenValidate,validateSchema(putServiceSchema),putMyServices)
app.delete("/service/:id",tokenValidate,deleteService)

export const router = app