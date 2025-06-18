const validator = require("validator");
const validate = (req, res) => {
  const { firstName, lastName, gender, email, password } = req.body;

  if (firstName.length < 3 || firstName.length > 30) {
    res.status(400).send("First-Name should be between 3 and 30 Chars");
  } else if (lastName.length < 4 || lastName.length > 30) {
    res.status(400).send("Last-Name should be between 4 and 40 Charcters");
  } else if (!validator.isEmail(email)) {
    res.status(400).send("Please Enter Valid Email");
  } else if (!validator.isStrongPassword(password)) {
    res.status(400).send("Please Enter Strong Password");
  }
};

module.exports = {
  validate,
};
