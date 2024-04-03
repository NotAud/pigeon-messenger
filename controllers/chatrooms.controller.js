const router = require("express").Router();
const { getChatrooms } = require("../api/chatrooms.api.js");

// Returns list of active chat rooms and their details
router.get("/", async (req, res) => {
  const data = await getChatrooms();
  res.render("chatrooms", { chatrooms: data });
});

module.exports = router;
