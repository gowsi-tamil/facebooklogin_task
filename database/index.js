const mongoose = require("mongoose");

// Connecting with mongo db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then((x) => {
    console.log(`database connected!`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo db", err.reason);
  });
