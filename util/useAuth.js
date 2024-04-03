const jwt = require("jsonwebtoken");

function useAuth() {
  // Validate JWT for authenticated api request
  function verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }

  return { verifyToken };
}

module.exports = { useAuth };
