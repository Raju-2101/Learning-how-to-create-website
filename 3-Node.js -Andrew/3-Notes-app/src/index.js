const express = require("express");

// require("dotenv").config();
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.send("hello");
  } catch (e) {
    res.sendStatus(500);
  }
});

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Application started successfully");
});

// const Task = require("./models/task");
// const User = require("./models/user");

// const a = async () => {

//   // const task = await Task.findById("5e81aa4a971c6842a8dd8c0b");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById("5e81a92a3d9c480d54201d56");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// a();
