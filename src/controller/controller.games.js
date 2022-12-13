import repository from "../database/repository.js";

const controller_games = {
    listGames: async (req, res) => 
    {
        const games = await repository.getGames();

        return res.status(200).send(games);
    },
    insertGame: async (req, res) => 
    {
        const { data } = res.locals;

        try
        {
            const query = await repository.addGame(data.name, data.image, data.stockTotal, data.categoryId, data.pricePerDay);
            
            if(!query) throw Error("query error");

            return res.status(200).send("Jogo adicionado.");
        }
        catch(err)
        {
            console.error(err);
            return res.sendStatus(404);
        }
    }
};

export default controller_games;