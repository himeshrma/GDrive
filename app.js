const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");

app.set("view engine", "ejs");

app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
