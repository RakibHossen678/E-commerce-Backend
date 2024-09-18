const express = require("express");
const User = require("./user.model");
const router = express.Router();

//register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
