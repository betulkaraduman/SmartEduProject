const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const pageRoute = require("./routes/pageRoute");
const contactRouter = require("./routes/contactRouter");
const methodOverride = require("method-override");
const courseRoute = require("./routes/courseRoute");
const categoryRouter = require("./routes/categoryRoute");
const userRouter = require("./routes/userRoute");
const MongoStore = require("connect-mongo");

mongoose
  .connect("mongodb+srv://dbUser:dbUser@cluster0.u7ez0.mongodb.net/smartEdu-db?retryWrites=true&w=majority")
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT || 5000;
//global değişken
global.UserIN = null;
app.set("view engine", "ejs");
app.use(express.static("public"));

//For take request.body informations

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "changed-session-info",
    resave: false,
    saveUninitialized: true,
    //db bağlantısı kapandığı zaman kullanıcı bilgisi kaybolmasın
    store: mongoStore.create({ mongoUrl: "mongodb://localhost/smartEdu-db" }),
    //cookie kullanılmadı var olması hata yaarttı
  })
);
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/category", categoryRouter);
app.use("/contact", contactRouter);
app.use("/users", userRouter);
app.use("/users", userRouter);
app.listen(PORT, (req, res) => {
  console.log(`App started ${PORT}`);
});
