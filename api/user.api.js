const { Auth, User } = require("../models/index.js");
const { useAuth } = require("../util/useAuth");

const auth = useAuth();

/**
 * AUTHENTICATED
 */

async function getProfile(data) {
  const { user_id } = data;
  const profile = await User.findOne({ where: { id: user_id } });
  return profile.get({ plain: true });
}

async function createUser(token, data) {
  const user = auth.verifyToken(token);
  if (!user) {
    return { message: "Invalid token" };
  }

  const hasProfile = await User.findOne({ where: { id: user.id } });
  if (hasProfile) {
    return { message: "User already has a profile" };
  }

  const { display_name } = data;
  if (!display_name || !user.id) {
    return { message: "Missing required fields" };
  }

  const nameTaken = await User.findOne({ where: { display_name } });
  if (nameTaken) {
    return { message: "Display name is already taken" };
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

async function updateProfile(token, data) {
  const user = auth.verifyToken(token);
  if (!user) {
    return { message: "Invalid token" };
  }

  const { display_name, name_color } = data;
  if ((!display_name && !name_color) || !user.id) {
    return { message: "Missing required fields" };
  }

  if (
    name_color &&
    (typeof name_color !== "string" || name_color.length !== 6)
  ) {
    return { message: "Invalid name color" };
  }

  try {
    const userData = await User.update(
      { ...data },
      {
        where: { id: user.id },
      }
    );
    return userData;
  } catch (err) {
    throw err;
  }
}

module.exports = { createUser, getProfile, updateProfile };
