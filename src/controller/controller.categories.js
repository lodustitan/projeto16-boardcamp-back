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

        await repository.addCategory(data.name);

        return res.status(200).send("Categoria adicionada.");
    }
};

export default controller_categories;