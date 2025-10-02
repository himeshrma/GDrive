const dotenv = require("dotenv");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const connectDB = require("./config/db");
const cokkieParser = require("cookie-parser");

dotenv.config();

connectDB();

app.set("view engine", "ejs");
app.use(cokkieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
