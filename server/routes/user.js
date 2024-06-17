const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.send("This is a user endpoint");
});

module.exports = router;
