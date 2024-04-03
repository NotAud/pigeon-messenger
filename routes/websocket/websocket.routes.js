const router = require("express").Router();
const chatroomsWebsocket = require("./chatrooms.websocket");
const chatroomWebsocket = require("./chatroom.websocket");

// Websocket routes
router.use("/chatrooms", chatroomsWebsocket);
router.use("/chatroom", chatroomWebsocket);

module.exports = router;
