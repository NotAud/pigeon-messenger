const express = require("express");
const { engine } = require("express-handlebars");
const router = require("./routes/router.js");
const sequelize = require("./config/connection.js");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
