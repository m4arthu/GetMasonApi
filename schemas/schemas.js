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