const passport = require("passport");
const { UnauthorizedError } = require("../utils/errors");

const isAuthenticated = (req, res, next) => {
  return passport.authenticate("bearer", {
    session: false,
    failureRedirect: "/auth/login",
    failWithError: true,
  })(req, res, (e) => {
    e ? next(new UnauthorizedError("Unauthorized")) : next();
  });
};

module.exports = isAuthenticated;