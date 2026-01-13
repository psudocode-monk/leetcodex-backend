const validator = require("validator");

function validate(data) {
    if (!data.firstName || !data.emailId || !data.password) {
        throw new Error("Missing required fields");
    }
    if (!validator.isEmail(data.emailId)) {
        throw new Error("Invalid email");
    }
    if (!validator.isStrongPassword(data.password)) {
        throw new Error("Password too weak");
    }
}

module.exports = {
    validate
};