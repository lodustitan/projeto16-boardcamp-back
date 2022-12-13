import repository from "../database/repository.js";

const controller_categories = {
    listCategories: async (req, res) => 
    {
        const category = await repository.getCategories();

        return res.status(200).send(category);
    },
    insertCategory: async (req, res) => 
    {
        const { data } = res.locals;

        try 
        {
            await repository.addCategory(data.name);
            return res.status(200).send("Categoria adicionada.");
        } catch (err) 
        {
            console.error(err);
            return res.sendStatus(404);
        }
    }
};

export default controller_categories;