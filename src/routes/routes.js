import { Router } from "express";

import controllers from "../controller/_index.js";
import middlewares from "../middleware/_index.js";

const route = Router();

//* Routes
route.get("/categories", controllers.categories.listCategories);
route.post("/categories", middlewares.categories.insertCategory, controllers.categories.insertCategory);

route.get("/games", controllers.games.listGames);
route.post("/games", middlewares.games.insertGame, controllers.games.insertGame);

route.get("/customers", controllers.customers.listCustomers);
route.get("/customers/:id", middlewares.customers.findCustomerById, controllers.customers.findCustomerById);
route.post("/customers", middlewares.customers.insertCustomer, controllers.customers.insertCustomer);
route.put("/customers/:id", middlewares.customers.updateCustomer, controllers.customers.updateCustomer);

route.get("/rentals", controllers.rentals.listRentals);
route.post("/rentals", middlewares.rentals.insertRental, controllers.rentals.insertRental);
route.post("/rentals/:id/return", middlewares.rentals.finishRental, controllers.rentals.finishRental);
route.delete("/rentals/:id", middlewares.rentals.deleteRental, controllers.rentals.deleteRental);

export default route;