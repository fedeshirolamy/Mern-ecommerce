require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.0lmxga7.mongodb.net/fedecommerce?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);

mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});
