const express = require("express");
require("dotenv/config");
require("./utils/db");
const courseRouter = require("./routers/courses");
const roundRouter = require("./routers/rounds");
const { errorHandler } = require("../src/utils/errors");

const app = express();

app.use(express.json());
app.get("/", (_req, res) => {
  res.send("Server running 🚀🚀🚀");
});
app.use("/api/courses", courseRouter);
app.use("/api/rounds", roundRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
