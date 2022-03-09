const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }
    if (query) {
      filter = { name: query };
    }
    if (!categorySlug && !query) {
      filter.name = "";
      filter.category = null;
    }
    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("user");

    const categories = await Category.find({});
    res.status(200).render("courses", {
      courses: courses,
      categories: categories,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      message: "Cannot show courses",
      error,
    });
  }
};
exports.getCourseById = async (req, res) => {
  try {
    const slug = req.params.slug;
    const course = await Course.findOne({ slug: slug });
    const categories = await Category.find({});
    const user = await User.findById({ _id: course.user });
    if (req.ses) console.log(req.session.userID);
    const Student = await User.findById({ _id: course.user });

    res.status(200).render("course", {
      course: course,
      page_name: "courses",
      categories,
      user,
      Student,
    });
  } catch (error) {
    res.status(400).json({
      message: "Cannot show courses",
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.session.userID });
    await user.courses.pull({ _id: req.body.courseId });
    await user.save();
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      message: "fail",
      error,
    });
  }
};
exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.session.userID });
    await user.courses.push({ _id: req.body.courseId });
    await user.save();
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      message: "fail",
      error,
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });

    req.flash("success", `${course.name} has been created successfully`);
    res.status(201).redirect("/courses");
  } catch (error) {
    req.flash("error", `Something happened`);
    res.status(400).redirect("/courses");
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove({ slug: req.params.slug });

    req.flash("success", `${course.name} has been deleted`);
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    req.flash("success", `Course has not been deleted`);
    res.status(400).redirect('/users/dashboard');
  }
};

exports.updateCourse = async (req, res) => {
  console.log("kfskd")
  try {
    
  console.log("kfskd")
    const course = await Course.findOne({ slug: req.params.slug });
    course.name = req.body.name
    course.description = req.body.description
    course.category = req.body.category
    course.save();
    req.flash("success", `${course.name} has been updated`);
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    req.flash("success", `Course has not been updated`);
    res.status(400).redirect('/users/dashboard');
  }
};