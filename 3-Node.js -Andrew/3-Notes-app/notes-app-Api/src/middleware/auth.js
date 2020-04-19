const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies["auth_token"];

    const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.render("index");
  }
};

module.exports = auth;
