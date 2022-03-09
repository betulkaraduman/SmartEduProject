const user = require("../models/User");

module.exports = (req, res, next) => {
  if (req.session.userID) {
    res.redirect("/");
  }
  next();
};
