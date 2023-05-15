const express = require("express");
const { loginController, registerController } = require("../controllers/userController");


// router 
const router = express.Router();
//check
router.get('/check', function (req, res) {
    res.send("check");
})
// login route
router.post('/login',loginController);

// register route
router.post('/register',registerController);

module.exports = router;