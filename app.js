const express = require("express");
const { connectDB } = require("./config/db");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/userAuth.js");
const { authRouter } = require("./routes/auth.js");
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

app.use("/", authRouter);
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
