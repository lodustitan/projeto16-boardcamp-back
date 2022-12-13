import repository from "../database/repository.js";
import Schemas from "../schema/schemas.js";


const middleware_games = {
    insertGame: async (req, res, next) => 
    {
        const model = Schemas.insertGame.validate(req.body, {abortEarly: false});

        if(model.error)
        {
            const details = model.error.details.map(detail => detail.message);
            return res.status(400).send(details);
        }
        else
        {
            const games = await repository.getGames();

            if(!games) return res.sendStatus(500);

            for(let el of games)
                if(el.name === req.body.name) return res.sendStatus(409);
        }

        res.locals.data = req.body;
        next();
    }
};

export default middleware_games;