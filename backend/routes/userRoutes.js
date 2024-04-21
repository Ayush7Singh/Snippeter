const express = require('express');
const router = express.Router();
const {register, profile,login,getUserDetails,logout} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');

const { addSnippet , exploreAdd,allSnips,getAllSnippet,getSnip, addSnippetOther,updateSnippet, dropSnippet,Search}=require('../controllers/snippetController');
const { compilerFunc } = require('../controllers/compilerController');



router.route('/user/register').post(register);
router.route('/user/login').post(login);
router.route('/user/logout').get(logout);
router.route('/profile').get(authenticateUser,profile);
router.route("/me").get(authenticateUser, getUserDetails);

router.route('/snippet/create').post(authenticateUser,addSnippet);
router.route('/add/snippet').post(authenticateUser,addSnippetOther);
router.route('/snippet/get').get(authenticateUser,getAllSnippet);
router.route("/snippet/get/:id").get(authenticateUser,getSnip);
router.route('/snippet/update/:id').post(authenticateUser,updateSnippet);
router.route('/snippet/delete/:id').delete(authenticateUser,dropSnippet);

router.route('/allsnip').get(authenticateUser,allSnips);
router.route('/compile').post(compilerFunc)
router.route('/explore/add').post(authenticateUser,exploreAdd);


module.exports = router;  