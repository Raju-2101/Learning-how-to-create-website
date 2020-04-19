// jshint esversion:6

// variables
const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extend: true}));


// calculator
app.get("/", function (req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

var num1 = Number(req.body.num1);
var num2 = Number(req.body.num2);

var result = num1 + num2;
  res.send("The answer is" + result);
});

// bmicalculator
app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", function(req, res){
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var bmi = weight / Math.pow(height, 2);

  res.send("your BMI is " + bmi);
});
app.listen(3000, function() {
  console.log("started server on port 3000");
});
