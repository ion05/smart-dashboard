const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const errors = [];
  const { username, email, password, modelNumber, emergencyContact } = req.body;
  if (!username || !email || !password) {
    errors.push({ msg: "Please Fill in all the fields" });
  }

  if (username.length < 5 || username.length > 17) {
    errors.push({ msg: "username should be in between 6 and 16 characters" });
  }

  if (password.length < 5 || password.length > 17) {
    errors.push({ msg: "Password should be in between 6 and 16 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      email,
      password,
      modelNumber,
      emergencyContact,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "User already exists, try logging in instead." });
        res.render("register", { error });
      } else {
        const newUser = new User({
          username: username,
          email: email,
          password: password,
          modelNumber: modelNumber,
          emergencyContact: emergencyContact,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;

            newUser
              .save()
              .then((user) => {
                res.redirect("/dashboard");
              })
              .catch((err) => );
          })
        );
      }
    });
  }
};

module.exports = {
  register,
};
