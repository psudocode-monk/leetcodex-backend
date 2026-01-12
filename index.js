const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server started at :" + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Error starting database", err);
    console.error(err);
  });
