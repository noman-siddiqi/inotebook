const { body } = require("express-validator");

const userValidator = [
    body("name", "Invalid name").not().isEmpty(),
    body("name", "The minimum name length is 3 characters").isLength({ min: 3 }),
    body("name", "The name cannot contain numbers").isString(),
    body("email", "Invalid email").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
    }),
];

module.exports = userValidator;