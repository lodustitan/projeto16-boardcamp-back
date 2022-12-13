import repository from "../database/repository.js";
import Schemas from "../schema/schemas.js";


const middleware_games = {
    insertGame: async (req, res, next) => 
    {
        const model = Schemas.insertCategory.validate(req.body);

        if(model.error)
            return res.sendStatus(400);
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