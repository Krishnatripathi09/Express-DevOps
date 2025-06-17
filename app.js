const express = require("express");
const { connectDB } = require("./config/db");
const { User } = require("./models/userSchema");
const bcrypt = require("bcrypt");
const app = express();

const PORT = 3001;
app.use(express.json());

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
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).send("All the information is Required");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const userData = await User({
    firstName,
    lastName,
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
  const passwordHash = user.password;
  const validPassword = await bcrypt.compare(password, passwordHash);

  if (validPassword) {
    res.status(200).send("Logged-In SuccessFully");
  } else {
    res.status(400).send("Please Enter Valid Credentials ==>Password");
  }
});
