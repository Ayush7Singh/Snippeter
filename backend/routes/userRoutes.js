const express = require('express');
const router = express.Router();
const {register, profile,login,getUserDetails,logout} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');

router.route('/user/register').post(register);
router.route('/user/login').post(login);
router.route('/user/logout').get(logout);
router.route('/profile').get(authenticateUser,profile);
router.route("/me").get(authenticateUser, getUserDetails);

module.exports = router;  