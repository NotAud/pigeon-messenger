const router = require("express").Router();
const { getChatroom } = require("../api/chatrooms.api.js");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await getChatroom(id);
  if (!data) {
    return res.redirect("/");
  }

  res.render("chatroom", { chatroom: data });
});

router.use(function (req, res) {
  res.redirect("/");
});

module.exports = router;
