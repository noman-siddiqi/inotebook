const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "my_jwt_secret_key_for_jwt_authToken";

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token an add id to req object
    const token = req.header("auth-token");
    if (!token)
        return res
        .status(401)
        .json({ message: "Access denied: You do not have permission" });

    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        console.error("Error occurred:", error.message);
        return res.status(500).json({ message: "Access denied: You do not have permission"});
    }
};
module.exports = fetchuser;
