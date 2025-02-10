import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import bodyParser from "body-parser";
import userRoutes from "./route/authRoute.js";

dotenv.config();

connectdb();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Server is running");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
