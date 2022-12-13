import cors from "cors";
import express from "express";
import route from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server on port: '${PORT}'`))