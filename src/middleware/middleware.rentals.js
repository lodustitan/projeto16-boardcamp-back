import repository from "../database/repository.js";
import Schemas from "../schema/schemas.js";

const middleware_rentals = {
    insertRental: async (req, res, next) => 
    {
        const {customerId, gameId} = req.body;

        const model = Schemas.insertRental.validate(req.body, {abortEarly: false});

        if(model.error)
        {
            const details = model.error.details.map(detail => detail.message);
            return res.status(400).send(details);
        }
        else
        {
            const customer = await repository.getCustomersById(customerId);
            const game = await repository.getGameById(gameId);
            const rentals = await repository.getRentalByGameId(gameId);

            if(!customer || !game) return res.sendStatus(400);
            if(rentals.length >= game.stock_total) return res.sendStatus(400); 
        }

        res.locals.data = req.body;
        next();
    },
    finishRental: (req, res, next) => 
    {
        const { id } = req.params;
        const model = Schemas.finishRental.validate({id}, {abortEarly: false});

        if(model.error)
        {
            const details = model.error.details.map(detail => detail.message);
            return res.status(400).send(details);
        }

        res.locals.data = { id };
        next();
    },
    deleteRental: async (req, res, next) => 
    {
        const { id } = req.params;
        const model = Schemas.deleteRental.validate({id}, {abortEarly: false});

        if(model.error)
        {
            const details = model.error.details.map(detail => detail.message);
            return res.status(400).send(details);
        }
        else
        {
            const rental = await repository.getRentalById(id);

            if(!rental) return res.sendStatus(404);
            if(!rental.return_date) return res.sendStatus(400);
        }

        res.locals.data = { id };
        next();
    }
};

export default middleware_rentals;