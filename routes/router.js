const router = require("express").Router();
const apiRoutes = require("./api/api.routes");

router.use("/api", apiRoutes);
router.use("/", require("../controllers/chatrooms.views.routes"));

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
