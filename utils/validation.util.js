const joi = require('joi');

const createProductSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    price: joi.number().integer().min(1).required(),
    created_at: joi.date().default(new Date()).optional(),
    updated_at: joi.date().default(new Date()).optional()
})

const updateProductSchema = joi.object({
    name: joi.string().min(3).max(100).optional(),
    price: joi.number().integer().min(1).optional(),
    updated_at: joi.date().default(new Date()).optional()
})

module.exports.validateCreateProduct = (data, opts = { abortEarly: false, allowUnknown: false }) => {
    return createProductSchema.validateAsync(data, opts);
}

module.exports.validateUpdateProduct = (data, opts = { abortEarly: false, allowUnknown: false }) => {
    return updateProductSchema.validateAsync(data, opts);
}