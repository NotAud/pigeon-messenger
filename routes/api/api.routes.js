const router = require("express").Router();
const authRoutes = require("./auth.routes");
const messageRoutes = require("./message.routes");
const chatroomRoutes = require("./chatroom.routes");

router.use("/auth", authRoutes);
router.use("/message", messageRoutes);
router.use("/chatroom", chatroomRoutes);

module.exports = router;
