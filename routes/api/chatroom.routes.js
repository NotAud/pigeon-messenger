const router = require("express").Router();
const { useChatroomStore } = require("../../util/useChatroomStore");
const { getChatroom } = require("../../api/chatrooms.api.js");

const chatroomStore = useChatroomStore();

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const chatroomData = await chatroomStore.create(token, req.body);
    res.status(200).json(chatroomData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "Please provide a chatroom ID",
    });
  }

  try {
    const chatroom = await getChatroom(id);
    res.status(200).json(chatroom);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
