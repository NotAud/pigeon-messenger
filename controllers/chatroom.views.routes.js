const router = require("express").Router();
const { getChatroom } = require("../api/chatrooms.routes.js");

router.get("/:chatroomID", async (req, res) => {
  const id = req.params.chatroomID;
  const chatroomData = await getChatroom(id);
  res.render("chatroom", { chatroom: chatroomData });
});

router.use(function (req, res) {
  res.redirect("/");
});

module.exports = router;
