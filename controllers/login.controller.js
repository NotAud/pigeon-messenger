const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("login", { layout: "base" });
});

module.exports = router;
