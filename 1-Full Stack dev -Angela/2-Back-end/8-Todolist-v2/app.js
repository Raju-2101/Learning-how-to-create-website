//jshint esversion:6

// requiring and using packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Raju_rapper:Raju_rapper2101@cluster0-ftmtu.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});


// creating new itemsSchema for content
const itemsSchema = {
  name: String
};

// creating new items collection
const Item = mongoose.model("Item", itemsSchema);

// creating new item data
const item1 = new Item({
  name: "And his"
});

const item2 = new Item({
  name: "name is"
});

const item3 = new Item({
  name: "John cena"
});

// pushing items into an array
const defaultItems = [item1, item2, item3];

// creating new listSchema for title
const listSchema = {
  name: String,
  items: [itemsSchema],
};

// creating new list collection
const List = mongoose.model("List", listSchema);

// getting it in home page
app.get("/", function(req, res) {

// finding if items collection has no data
  Item.find({}, function(err, foundItems) {

// if items collection doesn't has data
    if (foundItems.length === 0) {
      // saving data in items collection
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
      // redirecting to home page to add and show list at same time
      res.redirect("/");
    } else {
      // if items collection has data
      res.render("list", {listTitle: "Today",newListItems: foundItems});
    }
  });

});

// creating a custom page that a user wishes
app.get("/:customListName", function(req, res) {

// getting the data of what user wishes and using lodash to capitalize the firdt letter
  const customListName = _.capitalize(req.params.customListName);

// finding if lists collection has same data
  List.findOne({name: customListName}, function(err, foundList) {

    // if it doesn't has same data
    if(!err) {
      if(!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });

        // adding new data in lists collection
        list.save();

// redirecting to custom page to add and show list at same time
        res.redirect("/" + customListName);
      } else {

        // if the data is same
        res.render("list", {listTitle: customListName, newListItems: foundList.items});
      }
    }

  });
});

// getting data that the user typed
app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  // creating new data in items collection
  const newItem = new Item({
    name: itemName
  });
  // if custom name is equal to homepage title
 if (listName === "Today") {
  // adding new data in items collection
  newItem.save();

 // redirecting to home page to add and show list at same time
  res.redirect("/");

  // if it's a custom homepage title
} else {
  // finding the listtitle
  List.findOne({name: listName}, function(err, foundList){

    // pushing new items inside the list collection array
    foundList.items.push(newItem);

    // saving the data
    foundList.save();

    // redirecting to custom page
    res.redirect("/" + listName);
  });
}

});


// deleting the data if it gets clicked in checkbox
app.post("/delete", function(req, res) {

  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;


  if(listName === "Today") {

    // finding the data and deleting when it's clicked
      Item.findByIdAndRemove(checkedItemId, function(err) {
        if (!err) {
          console.log("success");
        }
      });
      // redirecting to home page to delete and show list at same time
      res.redirect("/");
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/" + listName);
      }
    });
  }
});

// listening to server

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
