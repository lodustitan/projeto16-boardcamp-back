import { Router } from "express";

import controllers from "../controller/_index.js";
import middlewares from "../middleware/_index.js";

const route = Router();

//* Routes
route.get("/categories", controllers.categories.listCategories);
route.post("/categories", middlewares.categories.insertCategory, controllers.categories.insertCategory);

route.get("/games", controllers.games.listGames);
route.post("/games", middlewares.games.insertGame, controllers.games.insertGame);

route.get("/customers");
route.get("/customers/:id");
route.post("/customers");
route.put("/customers/:id");

route.get("/rentals");
route.post("/rentals");
route.post("/rentals/:id/return");
route.delete("/rentals/:id");

export default route;