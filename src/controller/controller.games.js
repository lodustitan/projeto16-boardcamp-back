import repository from "../database/repository.js";

const controller_games = {
    listGames: async (req, res) => 
    {
        const games = await repository.getGames();

        return res.status(200).send(games);
    },
    insertGame: async (req, res) => 
    {
        
    }
};

export default controller_games;