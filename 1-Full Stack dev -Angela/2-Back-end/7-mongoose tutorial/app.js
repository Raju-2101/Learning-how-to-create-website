//jshint esversion:6

// require mongoose
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true,  useUnifiedTopology:true });

// create Schema

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "No name specified"]
    },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String
});

// create collection

const Fruit = mongoose.model("Fruit", fruitSchema);

// adding data to collection (Fruit)

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "pretty solid"
});

// saving one data to collection
// fruit.save();


// creating another schema
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

// creating another collection

const Person = mongoose.model("Person", personSchema);

// adding data to collection (Person)
const person = new Person ({
  name: "Amy",
  age: 23,
  favoriteFruit: fruit
});

// saving one data to collection
// person.save();


// adding more data to collection (Fruit)
const kiwi = new Fruit ({
  name: "Kiwi",
  rating: 0,
  review: "I didn't ate kiwi in my life"
});

const orange = new Fruit ({
  name: "Orange",
  rating: 5,
  review: "It's like an orange"
});

const banana = new Fruit ({
  name: "Banana",
  rating: 10,
  review: "It's very helpful for women"
});

const grapes = new Fruit ({
  rating: 5,
  review: "It's fucking small"
});

// grapes.save();

// saving more data to collection (Fruits)
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("success");
//   }
// });

// finding particular key of data in collections(formatted in array)
Fruit.find(function(err, fruits){
  if(err) {
    console.log(err);
  } else {

// closing mongoose connection
mongoose.connection.close();

// using forEach to call single key

    fruits.forEach(function(fruit) {
    console.log(fruit.name);
    });
  }
});

// updating one key in data

// Fruit.updateOne({_id: "5e034b84c46dac3d6883f491"}, {name: "Grapes"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("success");
//   }
// });

Person.updateOne({name: "john"}, {favoriteFruit: banana}, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("success");
  }
});

// deleting data from collections

// Fruit.deleteOne({name: "Grapes"}, function(err){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("success");
//   }
// });

Person.deleteOne({_id: "5e0355706f32c7399425d4d8"}, function(err){
  if(err) {
    console.log(err);
  } else {
    console.log("success");
  }
});
