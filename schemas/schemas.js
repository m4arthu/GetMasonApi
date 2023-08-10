import Joi from  "joi"

export const registerSchema = Joi.object({
    name: Joi.string().max(24).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    local: Joi.string().required(),
    password: Joi.string().required()
})

export const loginSchema  = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const serviceSchema = Joi.object({
    imageUrl: Joi.string().required(),
    title: Joi.string().required(),
    price: Joi.number().integer().required(),
    description: Joi.string().required(),
    avaible: Joi.boolean().required(),
    phone : Joi.number().required()
})

export const putServiceSchema = Joi.object({
    avaible: Joi.boolean().required()
})