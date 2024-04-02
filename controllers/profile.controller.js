const router = require("express").Router();
const { getProfile } = require("../api/user.api");

router.get("/", async (req, res) => {
  res.render("my-profile", { layout: "main" });
});

router.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  const profile = await getProfile({ user_id: userID });
  res.render("user-profile", { layout: "main", profile });
});

module.exports = router;
