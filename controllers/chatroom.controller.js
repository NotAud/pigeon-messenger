const router = require("express").Router();
const { getChatroom } = require("../api/chatrooms.api.js");

// Gets a chatroom by ID and the messages in it
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await getChatroom(id);

  // If invalid chatroom is deleted / doesn't exist, so redirect
  if (!data) {
    return res.redirect("/");
  }

  res.render("chatroom", { chatroom: data });
});

router.use(function (req, res) {
  res.redirect("/");
});

module.exports = router;
