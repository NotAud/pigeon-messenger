const router = require("express").Router();
const {
  getChatroom,
  createChatroom,
  deleteChatroom,
} = require("../../api/chatrooms.api.js");

router.post("/", async (req, res) => {
  try {
    const access_token = req.headers.authorization.replace("Bearer ", "");
    const data = await createChatroom(access_token, req.body);
    const chatroomData = data;
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

router.delete("/", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "Please provide a chatroom ID",
    });
  }

  try {
    const access_token = req.headers.authorization.replace("Bearer ", "");
    const chatroom = await deleteChatroom(access_token, { id });
    res.status(200).json(chatroom);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
