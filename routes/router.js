const router = require("express").Router();
const apiRoutes = require("./api/api.routes");
const wsRoutes = require("./websocket/websocket.routes");

router.use("/api", apiRoutes);
router.use("/ws", wsRoutes);
router.use("/", require("../controllers/chatrooms.views.routes"));
router.use("/chatroom", require("../controllers/chatroom.views.routes"));

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
