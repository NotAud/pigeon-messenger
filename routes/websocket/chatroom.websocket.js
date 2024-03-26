const router = require("express").Router();

router.ws("/:chatroomID", function (ws, req) {
  ws.on("message", function (msg) {
    ws.send(JSON.parse(msg));
  });
});

module.exports = router;
