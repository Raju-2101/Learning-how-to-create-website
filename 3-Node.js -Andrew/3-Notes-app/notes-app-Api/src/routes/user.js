const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

//create users
router.post("/user/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();

    const token = await user.generateJsonToken();
    res.cookie("auth_token", token);
    res.send({ success: "account created successfully" });
  } catch (e) {
    if (e.errmsg) {
      return res.send({ error: "Email already exists" });
    }
    res.send({ error: "Please provide valid email adderss" });
  }
  console.log(e);
});

//logging users
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error();
    }
    const token = await user.generateJsonToken();
    res.cookie("auth_token", token);
    res.redirect("/");
  } catch (e) {
    res.render("login", { error: "check your email or password" });
  }
});

module.exports = router;
