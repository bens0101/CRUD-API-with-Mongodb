const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`Server is running on port`);
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
