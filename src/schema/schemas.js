import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

const Schemas = {};

Schemas.insertCategory = Joi.object({
    name: Joi.string().min(1).required()
});
Schemas.insertGame = Joi.object({
    name: Joi.string().min(2).required(), 
    image: Joi.string().uri().required(), 
    stockTotal: Joi.number().required(), 
    categoryId: Joi.number().required(), 
    pricePerDay: Joi.number().required()
});
Schemas.findCustomerById = Joi.object({
    name: Joi.number().required()
});
Schemas.insertCustomer = Joi.object({
    name: Joi.string().min(2).required(), 
    phone: Joi.string().regex(/^[0-9]{10,11}$/).messages({'string.pattern.base': `Phone number must have 10-11 digits.`}).required(), 
    cpf: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `CPF number must have 11 digits.`}).required(), 
    birthday: Joi.date().format('YYYY-MM-DD').utc()
});
Schemas.updateCustomer = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(2).required(), 
    phone: Joi.string().regex(/^[0-9]{10,11}$/).messages({'string.pattern.base': `Phone number must have 10-11 digits.`}).required(), 
    cpf: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `CPF number must have 11 digits.`}).required(), 
    birthday: Joi.date().format('YYYY-MM-DD').utc()
})

Schemas.categories = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required()
});
Schemas.games = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    image: Joi.string().uri().required(),
    stockTotal: Joi.number().required(),
    categoryId: Joi.number().required(),
    pricePerDay: Joi.number().required()
});
Schemas.customers = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    cpf: Joi.string().required(),
    birthday: Joi.string().required()
});
Schemas.rentals = Joi.object({
    id: Joi.number().required(),
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    rentDate: Joi.string().required(),
    daysRented: Joi.number().required(),
    returnDate: Joi.string(),
    originalPrice: Joi.number().required(),
    delayFee: Joi.number()
});

export default Schemas;