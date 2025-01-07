import express, { Application } from "express";
import cors from "cors";
import bp from "body-parser";
import dotenv from "dotenv";
import router from "./routes/api.routes";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(bp.json());

app.use("/api/v1", router);


app.listen(PORT, () => console.log(`App listening port ${PORT}...`));
