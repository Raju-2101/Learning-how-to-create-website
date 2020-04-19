const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Use this site to get your weather!"
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/help", (req, res) => {
  res.render("help", { title: "help Page", name: "hi........" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Invalid address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, location, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log("started server at port 3000");
});
