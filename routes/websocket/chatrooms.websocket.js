const router = require("express").Router();
const { useWebsocket } = require("../../util/useWebsocket");
const { useChatroomStore } = require("../../util/useChatroomStore");

const chatroomStore = useChatroomStore();
let hasLoaded = false;

router.ws("/", function (ws, req) {
  if (!hasLoaded) {
    hasLoaded = true;
    chatroomStore.init();
  }

  const websocket = useWebsocket();
  websocket.save("chatroom", ws);
});

module.exports = router;
