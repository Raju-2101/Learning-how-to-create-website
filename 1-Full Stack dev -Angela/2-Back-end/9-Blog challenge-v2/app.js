//jshint esversion:6


// requiring packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

// creating new content
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// using packages
const app = express();

// for using ejs template
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

// for css
app.use(express.static("public"));

// connecting mongoose shell
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// creating new schema
const postsSchema = {
  title: String,
  content: String,
};

// creating new collection
const Post = mongoose.model("Post", postsSchema);

// creating home page
app.get("/", function(req, res) {

// finding all object in posts collection
  Post.find({}, function(err, foundPost) {

// linking and rendering to home.ejs
    res.render("home", {
      startingContent: homeStartingContent,
      posts: foundPost
    });
  });

});

// creating about page
app.get("/about", function(req, res) {

  // linking and rendering to about.ejs
  res.render("about", {
    aboutContent: aboutContent
  });
});

// creating content page
app.get("/contact", function(req, res) {

  // linking and rendering to contact.ejs
  res.render("contact", {
    contactContent: contactContent
  });
});

// creating compose page
app.get("/compose", function(req, res) {

  // linking and rendering to compose.ejs
  res.render("compose");
});

// creating new page using _id of data posts collection
app.get("/posts/:postId", function(req, res) {
  const requestedId = req.params.postId;

// finding the data using _id and linking to post.ejs
  Post.findOne({_id: requestedId}, function(err, foundPost) {
      res.render("post", {
        title: foundPost.title,
        content: foundPost.content
      });
  });
});

// getting data from compose.ejs
app.post("/compose", function(req, res) {

// creating new posts data using user typed
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

// saving data to posts collection without bug
  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });

});

// listening to server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
