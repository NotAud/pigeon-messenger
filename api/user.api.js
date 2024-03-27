const { Auth, User } = require("../models/index.js");
const { useAuth } = require("../util/useAuth");

const auth = useAuth();

async function createUser(token, data) {
  const user = auth.verifyToken(token);
  if (!user) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const hasProfile = await User.findOne({ where: { id: user.id } });
  if (hasProfile) {
    return res.status(400).json({
      message: "User already has a profile",
    });
  }

  const { display_name } = data;
  if (!display_name || !user.id) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    const userData = await User.create({
      id: user.id,
      display_name,
    });
    return userData.get({ plain: true });
  } catch (err) {
    throw err;
  }
}

module.exports = { createUser };
