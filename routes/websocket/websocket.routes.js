const router = require("express").Router();
const chatroomWebsocket = require("./chatrooms.websocket");

router.use("/chatrooms", chatroomWebsocket);

module.exports = router;
