const express = require('express');
const router = express.Router();
const {register, profile,login,getUserDetails,logout} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');

const { addSnippet ,getAllSnippet,getSnip, addSnippetOther,updateSnippet, dropSnippet, Search}=require('../controllers/snippetController');



router.route('/user/register').post(register);
router.route('/user/login').post(login);
router.route('/user/logout').get(logout);
router.route('/profile').get(authenticateUser,profile);
router.route("/me").get(authenticateUser, getUserDetails);

router.route('/snippet/create').post(addSnippet);
router.route('/add/snippet').post(addSnippetOther);
router.route('/snippet/get').get(getAllSnippet);
router.route("/snippet/get/:id").get(getSnip);
router.route('/snippet/update/:id').post(updateSnippet);
router.route('/snippet/delete/:id').delete(dropSnippet);


module.exports = router;  