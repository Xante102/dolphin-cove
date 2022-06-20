const port = process.env.PORT || 8080;

// Base Variables for Express
const path = require("path");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

const conn = require("./lib/db");

// --------------------------------------------------- R O U T I N G    S E C T I O N ---------------------------------------------------
const authRoute = require("./routes/auth");
const companiesRoute = require("./routes/tour-companies");
const programsRoute = require("./routes/programs");
const indexRoute = require("./routes/index");
const bookingsRoute = require("./routes/bookings");
// const teachersRoute = require("./routes/teachers");
const dashboardRoute = require("./routes/dashboard");
// // --------------------------------------------------------------------------------------------------------------------------------------

// Setup View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Finish Setup View Engine

//Setup BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Session
app.use(cookieParser());
app.use(
  session({
    secret: "#$%d01ph1nc0v3",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 120000 },
  })
);
app.use(flash());
// End Session Setup

// Routing Middleware
app.use("/tour-companies", companiesRoute);
app.use("/programs", programsRoute);
app.use("/bookings", bookingsRoute);
app.use("/", dashboardRoute);
// app.use("/students", studentsRoute);
app.use("/", indexRoute);
app.use("/auth", authRoute);
// End Routing Middleware

app.listen(port, () => console.log(`Listening on port ${port}..`));
