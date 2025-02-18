import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import bodyParser from "body-parser";
import userRoutes from "./route/authRoute.js";
import productRoute from "./route/productRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import passport from "./middleware/socialAuth.js";

dotenv.config();

connectdb();

const app = express();

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(passport.initialize());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Server is running");
});

app.use("/api/users", userRoutes);
app.use("/api/product", productRoute);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
