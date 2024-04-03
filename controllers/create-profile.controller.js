const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("create-profile", { layout: "base" });
});

module.exports = router;
