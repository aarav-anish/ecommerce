const admin = require("../middlewares/auth");

const authCheck = (req, res, next) => {
  console.log(req.headers); // token
  next();
};

module.exports = { authCheck };
