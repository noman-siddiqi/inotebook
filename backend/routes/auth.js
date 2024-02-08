
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require("express");
const User = require("../models/User");
const router = express.Router();

const userValidator = require("../validator/FieldValidation");
const JWT_SECRET_KEY = "my_jwt_secret_key_for_jwt_authToken";
// Create a new user using the http method POST and No login is required
router.post("/createUser", userValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if(user){
      return res.status(409).json({ message: "Email address already exists "});
    }
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    console.log(hash.toString());
    // user = User(req.body);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash  // Save hashed password to the database
    });
    const data = {
      user:{
        id: user.id
      }
    }
  const authToken = jwt.sign(data, JWT_SECRET_KEY);
    console.log(authToken.toString());
    await user.save();
    return res.status(200).json({authToken});
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({ message: "Internal Server Error"});
  }
});


module.exports = router;
