const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("register", { layout: "base" });
});

module.exports = router;
