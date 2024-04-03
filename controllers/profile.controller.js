const router = require("express").Router();
const { getProfile } = require("../api/user.api");

// Return Personal Profile
router.get("/", async (req, res) => {
  res.render("my-profile", { layout: "main" });
});

// Return Another User's Profile
router.get("/:userID", async (req, res) => {
  const { userID } = req.params;
  const profile = await getProfile({ user_id: userID });
  res.render("user-profile", { layout: "main", profile });
});

module.exports = router;
