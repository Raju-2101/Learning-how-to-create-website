// const fs = require("fs");

// fs.writeFileSync("note.txt", "wanna suck my dick?");

// fs.appendFileSync("note.txt", " ofcourse, I love it");

// const notes = require("./notes.js");

// const note = notes();

// console.log(note);

// // const validator = require("validator").default;

// // console.log(validator.isEmail("jhjhj@kjkj.sd"));

// // const chalk = require("chalk");

// // console.log(
// //   chalk`{blue.bold ${"hello"}} you fucking son of a {red.strikethrough ${"bitch"}}`
// // );

// // console.log(chalk.redBright.bgBlue("hey"));

// console.log(process.argv);

const yargs = require("yargs");
const note = require("./notes");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    note.addNotes(argv.title, argv.body);
    note.listNotes();
  }
});

yargs.command({
  command: "remove",
  describe: "remove note",
  builder: {
    title: {
      describe: "add title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    note.removeNotes(argv.title);
    note.listNotes();
  }
});

yargs.command({
  command: "read",
  describe: "read file",
  builder: {
    title: {
      describe: "adding title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    note.readNotes(argv.title);
  }
});

yargs.parse();
