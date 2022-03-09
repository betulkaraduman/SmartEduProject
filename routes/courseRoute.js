const express=require('express');
const router=express.Router();
const courseController=require('../controllers/courseController')
const roleMiddleware=require('../middleware/roleMiddleware')

router.route('/').post(roleMiddleware("Teacher","Admin"),courseController.createCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);
router.route('/release').post(courseController.releaseCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourseById);

module.exports= router;