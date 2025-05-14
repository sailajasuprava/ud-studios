const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("./config/passport");

const AppError = require("./utils/appArror");
const globalErrorHandler = require("./controllers/errorController");
const searchRouter = require("./routes/searchRoutes");
const authRouter = require("./routes/authRoutes");

const corsOptions = {
  origin: " http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

//MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json({ limit: "4Mb" }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/searches", searchRouter);

//CUSTOM ERROR MESSAGE FOR UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
