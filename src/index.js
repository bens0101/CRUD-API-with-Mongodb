const express = require("express");
require("dotenv/config");
require("./utils/db");
const passport = require("passport");
const courseRouter = require("./routers/courses");
const roundRouter = require("./routers/rounds");
const authRouter = require("./middleware/auth.js");
const { errorHandler } = require("./utils/errors");
const isAuthenticated = require("./middleware/isAuthenticated");

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.get("/", (_req, res) => {
  res.send("Server running 🚀🚀🚀");
});
app.use("/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/rounds", roundRouter);
app.use(errorHandler);

app.get("/success", (_req, res) => {
  res.send("Success");
});

app.get("/fail", (_req, res) => {
  res.send("Fail");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});