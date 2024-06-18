const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// constrollers
const { createOrUpdateUser } = require("../controllers/auth");

router.get("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = router;
