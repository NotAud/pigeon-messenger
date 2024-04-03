const router = require("express").Router();
const apiRoutes = require("./api/api.routes");
const wsRoutes = require("./websocket/websocket.routes");

// API routes
router.use("/api", apiRoutes);
router.use("/ws", wsRoutes);

// View/Controller Routes
router.use("/login", require("../controllers/login.controller"));
router.use("/register", require("../controllers/register.controller"));
router.use(
  "/create-profile",
  require("../controllers/create-profile.controller")
);
router.use("/", require("../controllers/chatrooms.controller"));
router.use("/chatroom", require("../controllers/chatroom.controller"));
router.use("/profile", require("../controllers/profile.controller"));

// Wrong route
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
