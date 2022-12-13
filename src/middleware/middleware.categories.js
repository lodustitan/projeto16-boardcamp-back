import Schemas from "../schema/schemas.js";
import repository from "../database/repository.js";

const middleware_categories = {
    insertCategory: async (req, res, next) => 
    {
        const { name } = req.body;
        const model = Schemas.insertCategory.validate(req.body, {abortEarly: false});

        if(model.error)
        {
            const details = model.error.details.map(detail => detail.message);
            return res.status(400).send(details);
        }
        else
        {
            const categories = await repository.getCategories();

            if(!categories) return res.sendStatus(500);

            for(let el of categories)
            {
                if(el.name === name) return res.sendStatus(409);
            }
        }
        res.locals.data = {name};
        next();
    }
};

export default middleware_categories;