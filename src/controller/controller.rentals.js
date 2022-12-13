import repository from "../database/repository.js";
import Schemas from "../schema/schemas.js";

const controller_categories = {
    listRentals: async (req, res) => 
    {
        const { customerId, gameId } = req.query;

        const modelC = Schemas.listRentalsQueryCustomer.validate({customerId});
        const modelG = Schemas.listRentalsQueryGame.validate({gameId});

        if(!modelC.error)
        {
            const query = await repository.getRentalByCustomerId(customerId);
            return res.status(200).send(query);
        }
        if(!modelG.error)
        {
            const query = await repository.getRentalByGameId(gameId);
            return res.status(200).send(query);
        }

        const rentals = await repository.getRentals();

        return res.status(200).send(rentals);
    },
    insertRental: async (req, res) => 
    {
        const { data } = res.locals;

        try
        {
            const query = await repository.addRental(data.customerId, data.gameId, data.daysRented);

            if(!query) throw Error("query error");

            return res.status(200).send("Rental adicionado.");
        }
        catch(err)
        {
            console.error(err);
            return res.sendStatus(500)
        }
    },
    finishRental: async (req, res) => 
    {
        const { data } = res.locals;

        try
        {
            const query = await repository.finishRental(data.id);

            if(!query) throw Error("query error");

            return res.status(200).send("Rental finalizado.");
        }
        catch(err)
        {
            console.error(err);
            return res.sendStatus(500)
        }
    },
    deleteRental: async (req, res) => 
    {
        const { data } = res.locals;

        try
        {
            const query = await repository.deleteRental(data.id);

            if(!query) throw Error("query error");

            return res.status(200).send("Rental deletado.");
        }
        catch(err)
        {
            console.error(err);
            return res.sendStatus(500)
        }
    }
};

export default controller_categories;