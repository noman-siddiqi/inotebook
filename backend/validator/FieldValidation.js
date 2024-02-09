const { body } = require("express-validator");

const userValidator = [
    body("name", "The minimum name length is 3 characters").isLength({ min: 3 }),
    body("name", "The name cannot contain numbers").isString(),
    body("email", "Invalid email").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "The minimum password length is 6 characters").isLength({min: 6 }),
];

const loginValidator = [
    body("email", "Invalid email").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password").not().isEmpty()
]

const noteValidator = [
    body("title", "The minimum name length is 3 characters").isLength({min:3}),
    body("description", "The minimum name length is 3 characters").isLength({min:3}),
];
module.exports = {userValidator, loginValidator, noteValidator};