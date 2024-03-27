const router = require("express").Router();
const { getChatrooms } = require("../api/chatrooms.api.js");

router.get("/", async (req, res) => {
  const data = await getChatrooms();
  res.render("chatrooms", { chatrooms: data });
});

module.exports = router;
