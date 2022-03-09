
const express=require('express');
const router=express.Router();
const pageController=require('../controllers/pageController')

const redirectMiddleware=require('../middleware/redirectMiddleware')

router.route('/').get(pageController.getContactPage);
router.route('/').post(pageController.sendEmail);
module.exports= router;