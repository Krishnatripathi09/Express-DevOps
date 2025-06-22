const express = require("express");
const { connectDB } = require("./config/db");
const { User } = require("./models/userSchema");
const bcrypt = require("bcrypt");
const { validate } = require("./utils/validation.js");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/userAuth.js");

const app = express();

const PORT = 3001;
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
connectDB()
  .then(() => {
    console.log("Connection to DataBase SuccessFull");

    app.listen(PORT, () => {
      console.log(`App is Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error Occured :" + err);
  });

app.post("/signup", async (req, res) => {
  validate(req, res);
  const { firstName, lastName, gender, email, password } = req.body;

  if (!firstName || !lastName || !gender || !email || !password) {
    res.status(400).send("All the information is Required");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const userData = await User({
    firstName,
    lastName,
    gender,
    email,
    password: passwordHash,
  });

  await userData.save();

  res.status(201).send("Signed Up SuccessFully");
});

app.post("/signin", async (req, res) => {
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

app.get("/users", userAuth, async (req, res) => {
  const user = req.user;

  res.status(200).send("User ==>" + user);
});

app.post("/logout", (req, res) => {
  res.clearCookie(token, null, {
    expires: new Date(Date.now()),
  });

  res.status(200).send("Log-Out Successfull");
});
