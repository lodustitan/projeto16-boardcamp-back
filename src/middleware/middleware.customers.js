import repository from "../database/repository.js";
import Schemas from "../schema/schemas.js";

const middleware_customers = {
    findCustomerById: async (req, res, next) => 
    {
        const model = Schemas.findCustomerById.validate(req.params, {abortEarly: false});

        if(model.error)
        {
            const details = model.error.details.map(detail => detail.message);
            return res.status(400).send(details);
        }

        res.locals.data = req.params;
        next();

    },
    insertCustomer: async (req, res, next) => 
    {
        let { name, phone, cpf, birthday } = req.body;

        birthday = new Date(birthday).toLocaleDateString("pt-BR");

        const model = Schemas.insertCustomer.validate({ name, phone, cpf, birthday }, {abortEarly: false});

        if(model.error)
        {
            const details = model.error.details.map(detail => detail.message);
            return res.status(400).send(details);
        }
        else
        {
            const customers = await repository.getCustomers();

            if(!customers) return res.sendStatus(500);

            for(let el of customers)
            {
                if(el.name === req.body.name) return res.sendStatus(409);
            }
        }
        res.locals.data = req.body;
        next();
    },
    updateCustomer: async (req, res, next) => 
    {
        const { id } = req.params;
        let { name, phone, cpf, birthday } = req.body;

        birthday = new Date(birthday).toLocaleDateString("pt-BR");

        const model = Schemas.updateCustomer.validate({ id, name, phone, cpf, birthday }, {abortEarly: false});

        if(model.error)
        {
            const details = model.error.details.map(detail => detail.message);
            return res.status(400).send(details);
        }

        res.locals.data = { id, name, phone, cpf, birthday };
        next();
    }
};

export default middleware_customers;