const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { useChatroomStore } = require("../../util/useChatroomStore");

const chatroomStore = useChatroomStore();

router.post("/", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const { name } = req.body;
  if (!user.id || !name) {
    return res.status(400).json({
      message: "Please provide a userID and name",
    });
  }

  try {
    const chatroomData = await chatroomStore.create({
      name,
      owner_id: user.id,
    });
    res.status(200).json(chatroomData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
