import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Router from "./routes/router.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(Router);

app.get("/", (req, res) => {
    res.render("index");
});

async function startServer() {
    try {
        app.listen(port, () => console.log(`🤖 Listening on Port: ${port}`));
    } catch (err) {
        console.log("🤖 Oh no something went wrong", err);
    }
}

startServer();
