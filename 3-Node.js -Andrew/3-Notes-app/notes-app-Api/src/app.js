require("dotenv").config();

require("./db/mongoose");
const userRouter = require("./routes/user");
const renderRouter = require("./routes/render");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT;

// to convert json files
app.use(express.json());

// It parses incoming requests with urlencoded payloads.
app.use(express.urlencoded({ extended: true }));

// setting cookieParser as middleware
app.use(cookieParser());

// setting paths
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials");

//to serve static files
app.use(express.static(publicPath));

// to set view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);

// setting partials(templates) for hbs
hbs.registerPartials(partialsPath);

// setting helper function for headers ref:https://www.sitepoint.com/a-beginners-guide-to-handlebars/
// Handlebars.registerHelper("message", function (errors) {
//   errors.forEach((cur) => {
//     return cur.message;
//   });
// });

// setting routers in middleware
app.use(renderRouter);
app.use(userRouter);

app.listen(port, () => console.log(`server running on port ${port}`));
