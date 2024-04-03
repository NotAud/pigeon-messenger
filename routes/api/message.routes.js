const router = require("express").Router();
const { createMessage, getMessages } = require("../../api/message.api.js");

// Create a new message
router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const messageData = await createMessage(token, req.body);
    res.status(200).json(messageData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messageData = await getMessages(req.body);
    res.status(200).json(messageData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
