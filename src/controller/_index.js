import controllerCategories from "./controller.categories.js";
import controllerCustomers from "./controller.customers.js";
import controllerGames from "./controller.games.js";
import controllerRentals from "./controller.rentals.js";

const controllers = {
    categories: controllerCategories,
    customers: controllerCustomers,
    games: controllerGames,
    rentals: controllerRentals
};

export default controllers;