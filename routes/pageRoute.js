const express=require('express');
const router=express.Router();
const pageController=require('../controllers/pageController')

const redirectMiddleware=require('../middleware/redirectMiddleware')

router.route('/').get(pageController.getHomePage);
router.route('/about').get(pageController.getAboutPage)

router.route('/register').get(redirectMiddleware,pageController.getRegisterPage)

router.route('/login').get(redirectMiddleware,pageController.getLoginPage)
module.exports= router;