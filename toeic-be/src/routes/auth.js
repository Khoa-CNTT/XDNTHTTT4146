const express = require("express");
const passport = require("passport");
const router = express.Router();
const { generateJwtToken } = require("../utils/jwtHelper");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.redirect("http://localhost:5173/auth/fail");
      }

      const token = generateJwtToken(user);

      res.redirect(`http://localhost:5173/auth/success?token=${token}`);
    } catch (error) {
      console.error("Error in Google callback:", error);
      res.redirect("http://localhost:5173/auth/fail");
    }
  }
);

module.exports = router;
