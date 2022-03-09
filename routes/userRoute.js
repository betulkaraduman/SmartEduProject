const express = require("express");
const router = express.Router();
const authControlller = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const { body } = require("express-validator");
const User = require("../models/User");
router.route("/signup").post(
  [body("name").not().isEmpty().withMessage("Please enter your name")],
  [
    body("email")
      .isEmail()
      .withMessage("Please enter valid email ")
      .custom((userEmail) => {
        return User.find({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("Email alreay exist");
          }
        });
      }),
  ],

  [body("password").not().isEmpty().withMessage("Please enter your password")],
  authControlller.createUser
);
router.route("/login").post(
    [body("email").not().isEmpty().withMessage("Please enter your email")],
    [body("password").not().isEmpty().withMessage("Please enter your password")],

    authControlller.loginUser);
router.route("/logout").get(authControlller.logoutUser);
router.route("/:id").delete (authControlller.deleteUser);

router
  .route("/dashboard")
  .get(authMiddleware, authControlller.getDashboardPage);
// router.route('/').get(categoryController.getAllCategories);

module.exports = router;
