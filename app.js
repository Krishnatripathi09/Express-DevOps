const express = require("express");
const { connectDB } = require("./config/db");
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

app.post("/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).send("All the information is Required");
  }

  console.log(firstName, lastName, email, password);
  res.send("Logged the Details");
});
