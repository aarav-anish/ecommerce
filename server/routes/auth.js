const express = require("express");

const router = express.Router();

router.get("/create-or-update-user", (req, res) => {
  res.send("This is a node api");
});

module.exports = router;
