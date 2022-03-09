const Category = require("../models/Category");
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await category.find({});
    res.status(200).render("xxx", { categories: categories });
  } 
  catch (error) {
    res.status(404).json({ message: "do not create", error });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).redirect('/users/dashboard')
  } catch (error) {
    res.status(404).json({ message: "do not create", error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    // req.flash("success", `${user.name} has been deleted`);
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

