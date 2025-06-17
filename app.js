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

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  
});
