import BaseJoi from 'joi';
import JoiDate from '@joi/date';

const Joi = BaseJoi.extend(JoiDate);

const Schemas = {};

Schemas.listRentalsQueryCustomer = Joi.object({
    customersId: Joi.number().required()
});
Schemas.listRentalsQueryGame = Joi.object({
    gameId: Joi.number().required()
});
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
    id: Joi.number().required()
});

const customersData = {
    name: Joi.string().min(2).required(), 
    phone: Joi.string().regex(/^[0-9]{10,11}$/).messages({'string.pattern.base': `\"phone\" number must have 10-11 digits`}).required(), 
    cpf: Joi.string().regex(/^[0-9]{11}$/).messages({'string.pattern.base': `\"cpf\" number must have 11 digits`}).required(), 
    birthday: Joi.date().format('DD/MM/YYYY').utc()
};
Schemas.insertCustomer = Joi.object({
    ...customersData
});
Schemas.updateCustomer = Joi.object({
    id: Joi.number().required(),
    ...customersData
});

Schemas.insertRental = Joi.object({
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().min(1).required()
});
Schemas.finishRental = Joi.object({
    id: Joi.number().required(),
});
Schemas.deleteRental = Joi.object({
    id: Joi.number().required(),
});


export default Schemas;