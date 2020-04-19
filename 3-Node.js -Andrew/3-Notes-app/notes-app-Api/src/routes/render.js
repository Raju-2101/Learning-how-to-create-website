const express = require("express");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("", auth, (req, res) => {
  res.render("tasks", { name: req.user.name, email: req.user.email });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
