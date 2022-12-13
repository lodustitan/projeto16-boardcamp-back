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
            const query = await repository.addCategory(data.name);

            if(!query) throw Error("query error")

            return res.status(200).send("Categoria adicionada.");
        } 
        catch (err) 
        {
            console.error(err);
            return res.sendStatus(500);
        }
    }
};

export default controller_categories;