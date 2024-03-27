const express = require("express");
const { engine } = require("express-handlebars");
const sequelize = require("./config/connection.js");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

const expressWs = require("express-ws")(app);

app.engine(
  "handlebars",
  engine({
    helpers: {
      json: function (context) {
        return JSON.stringify(context);
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const router = require("./routes/router.js");
app.use(router);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
