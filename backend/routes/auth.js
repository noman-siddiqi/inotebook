
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require("express");

const User = require("../models/User");
const router = express.Router();
const {userValidator, loginValidator} = require("../validator/FieldValidation");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET_KEY = "my_jwt_secret_key_for_jwt_authToken";


//ROUTE # 1: Create a new user using the http method POST and No login is required
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
    success = true;
    return res.status(200).json({success, authToken});
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({ message: "Internal Server Error"});
  }
});


//ROUTE # 2: Authenticate a user using: GET /api/auth/login. No login is required
router.post('/login', loginValidator, async(req, res) => {
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const{email, password} = req.body;
  try {
    let user = await User.findOne({email: email});
    if(!user){
      success = true;
      return res.status(404).json({success, message: "Please try to login with valid login credentials"});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(404).json({ message: "Please try to login with valid login credentials"});
    }
    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET_KEY);
    success = true;
    return res.status(200).json({success, authToken});
  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({ message: "Internal Server Error"});
  }
});


//ROUTE # 3: Get the user details using: "/api/auth/getuser" after jwt authentication: Login is required
router.get('/getuser',fetchuser, async(req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    res.send(user);
    if(!user){
      return res.status(409).json({ message: "Email address already exists "});
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error"});
  }
});

module.exports = router;
