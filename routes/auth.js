const express = require("express");
const authRouter = express.Router();
const { validate } = require("../utils/validation");
const { User } = require("../models/userSchema");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  validate(req, res);
  const { firstName, lastName, gender, email, password } = req.body;

  if (!firstName || !lastName || !gender || !email || !password) {
    res.status(400).send("All the information is Required");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await User.create({
      firstName,
      lastName,
      gender,
      email,
      password: passwordHash,
    });
  } catch (err) {
    return res.status(400).send("Error Occured :" + err);
  }

  res.status(201).send("Signed Up SuccessFully");
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Please Enter Email and Password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send("Please Enter Valid Credentials ==> Email");
  }

  const validPassword = await user.verifyPWD(password);
  const token = await user.getJWT();

  if (validPassword) {
    res.cookie("token", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    res.status(200).send("Logged-In SuccessFully");
  } else {
    res.status(400).send("Please Enter Valid Credentials ==>Password");
  }
});

module.exports = {
  authRouter,
};
