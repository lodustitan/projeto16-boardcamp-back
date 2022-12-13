import middlewareCategories from "./middleware.categories.js";
import middlewareCustomers from "./middleware.customers.js";
import middlewareGames from "./middleware.games.js";
import middlewareRentals from "./middleware.rentals.js";

const middlewares = {
    categories: middlewareCategories,
    customers: middlewareCustomers,
    games: middlewareGames,
    rentals: middlewareRentals
};

export default middlewares;