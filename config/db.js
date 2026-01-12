const mongoose = require("mongoose");

async function connectDb() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully", conn.version);
  } catch (error) {
    console.log("Error connecting database server", error);
  }
}

module.exports = connectDb;
