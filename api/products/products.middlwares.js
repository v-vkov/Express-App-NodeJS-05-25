const validationUtil = require('../../utils/validation.util');

const checkProductCreation = async (req, res, next) => {
    try {
        const data = await validationUtil.validateCreateProduct(req.body);
        req.body = data;

        next();
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
};

const checkProductUpdate = async (req, res, next) =>{
    try {

        if (!req.params.id) {
            return res.status(400).json({ error: 'Product id is required' });
        }

        const data = await validationUtil.validateUpdateProduct(req.body);
        req.body = data;

        next();
    } catch (error) {
        return res.status(400).json({ error: error.details });
    }
}

module.exports = {
    checkProductCreation,
    checkProductUpdate
};