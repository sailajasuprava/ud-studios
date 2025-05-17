const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./config/passport");

const AppError = require("./utils/appArror");
const globalErrorHandler = require("./controllers/errorController");
const searchRouter = require("./routes/searchRoutes");
const authRouter = require("./routes/authRoutes");

const corsOptions = {
  origin: process.env.CLIENT_URL,
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
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
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
