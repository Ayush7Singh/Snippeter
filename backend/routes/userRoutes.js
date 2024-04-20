const express = require('express');
const router = express.Router();
const {register, profile,login,getUserDetails,logout} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');

const { addSnippet ,getAllSnippet, addSnippetOther}=require('../controllers/snippetController');



router.route('/user/register').post(register);
router.route('/user/login').post(login);
router.route('/user/logout').get(logout);
router.route('/profile').get(authenticateUser,profile);
router.route("/me").get(authenticateUser, getUserDetails);

router.route('/snippet/create').post(addSnippet);
router.route('/add/snippet').post(addSnippetOther);
router.route('/snippet/get').get(getAllSnippet);

module.exports = router;  