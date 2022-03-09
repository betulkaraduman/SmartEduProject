const Course=require('../models/Course')
const nodemailer=require('nodemailer');
const User = require('../models/User');
const Category = require('../models/Category');
exports.getHomePage =async (req, res) => {
 const lastTwoCourse=await Course.find().sort({_id:-1}).limit(2);
 const courseCount=await Course.count();
 const studentCount=await User.find({role:'Student'}).count();
 const categoryCount=await Category.count();
console.log(courseCount)  
console.log(studentCount)  
console.log(categoryCount)  

  res.status(200).render("index", { page_name: "index",lastTwoCourse, courseCount,studentCount,categoryCount});
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", { page_name: "about" });
};
exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", { page_name: "register" });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", { page_name: "login" });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", { page_name: "contact" });
};


exports.sendEmail =async (req, res) => {
try {

  const outputMessage=`<h3>Message Detail</h3>
  <ul>
  <li>Name : ${req.body.name}</li>
  <li>Email : ${req.body.email}</li>
  </ul>
  <h4>Message</h4>
  <p>${req.body.message}</p>
  `
 
  let transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true, // true for 465, false for other ports
   auth: {
     user: "NodejsTestmailexe@gmail.com", // gmail account
     pass:  "nhhpslvbdatprvke", // gmail password
   },
 });
 
 // send mail with defined transport object
 let info = await transporter.sendMail({
   from: '"Smart Edu Conttact Form" <NodejsTestmailexe@gmail.com>', // sender address
   to: "betul77krdmn@hotmail.com", // list of receivers
   subject: "Smart Edu Conttact Form", // Subject line
   html: outputMessage // html body
 });
 
 console.log("Message sent: %s", info.messageId);
 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
 
 // Preview only available when sending through an Ethereal account
 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 req.flash("success","We received your message successfully")
 res.status(200).redirect('contact')
   
} catch (error) {
  req.flash("error",`Something happened`)
  res.status(401).redirect('contact');
}




};



