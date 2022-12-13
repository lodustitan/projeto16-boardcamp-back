import Schemas from "../schema/schemas.js";
import repository from "../database/repository.js";

const middleware_categories = {
    insertCategory: async (req, res, next) => 
    {
        const model = Schemas.insertCategory.validate(req.body);

        if(model.error)
        {
            return res.sendStatus(400);
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