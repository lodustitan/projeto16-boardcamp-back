import repository from "../database/repository.js";
import Schemas from "../schema/schemas.js";

const middleware_customers = {
    findCustomerById: async (req, res, next) => 
    {
        const model = Schemas.findCustomerById.validate(req.params);

        if(model.error)
        {
            const details = model.error.details.map(detail => detail);
            return res.status(400).send(details);
        }

        res.locals.data = req.params;
        next();

    },
    insertCustomer: async (req, res, next) => 
    {
        const model = Schemas.insertCustomer.validate(req.body);

        if(model.error)
        {
            const details = model.error.details.map(detail => detail);
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
        const { name, phone, cpf, birthday } = req.body;

        const model = Schemas.updateCustomer.validate({ id, name, phone, cpf, birthday });

        if(model.error)
        {
            const details = model.error.details.map(detail => detail);
            return res.status(400).send(details);
        }

        res.locals.data = { id, name, phone, cpf, birthday };
        next();
    }
};

export default middleware_customers;