const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function userMiddleware(req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token not found");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = payload;
    if (!id) {
      throw new Error("Id not found");
    }

    const result = await User.findById(id);

    if(!result) {
        throw new Error("User doesn't exists");
    }

    
  } catch (error) {}
}
