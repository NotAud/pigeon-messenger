const router = require("express").Router();
const authRoutes = require("./auth.routes");
const messageRoutes = require("./message.routes");
const chatroomRoutes = require("./chatroom.routes");
const chatroomsRoutes = require("./chatrooms.routes");

router.use("/auth", authRoutes);
router.use("/message", messageRoutes);
router.use("/chatroom", chatroomRoutes);
router.use("/chatrooms", chatroomsRoutes);

module.exports = router;
