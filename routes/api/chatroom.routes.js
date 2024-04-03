const router = require("express").Router();
const {
  getChatroom,
  createChatroom,
  deleteChatroom,
} = require("../../api/chatrooms.api.js");

// Create a new chatroom
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

// Get a chatroom by ID
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

// Delete a chatroom by ID
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
