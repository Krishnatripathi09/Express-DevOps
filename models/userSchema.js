const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Please Enter Valid Gender");
        }
      },
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = jwt.sign({ id: user.id }, "MySecretIsSecret@%^*123", {
    expiresIn: "1hr",
  });
  return token;
};

userSchema.methods.verifyPWD = async function (passwordInputByUser) {
  const user = this;

  const validPassword = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );

  return validPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
