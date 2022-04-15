const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error();
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let verifiedToken;
  try {
    verifiedToken = await jwt.verify(token, "jamesnodejs");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!verifiedToken) {
    const error = new Error();
    error.statusCode = 401;
    throw error;
  }

  req.username = verifiedToken.username;
  next();
};
