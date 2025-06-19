const { User } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(400).send("Please Log-In Again");
  }

  const { id } = jwt.verify(token, "MySecretIsSecret@%^*123");

  const user = await User.findById(id).select("firstName lastName email");

  if (!user) {
    res.status(404).send("Please Enter Valid Credentials");
  }

  req.user = user;
  next();
};

module.exports = {
  userAuth,
};
