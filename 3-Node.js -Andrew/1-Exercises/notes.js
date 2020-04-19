const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
  const notes = readNote();

  const duplicate = notes.find(cur => cur.title === title);

  if (duplicate) {
    notes.push({
      title: title,
      body: body
    });
    modifyNotes(notes);
    console.log(chalk.green("added note successfully"));
  } else {
    console.log(chalk.red("note already exists!"));
  }
};

const removeNotes = title => {
  const notes = readNote();

  const duplicate = notes.filter((cur, index) => {
    return cur.title !== title;
  });

  if (notes.length !== duplicate.length) {
    modifyNotes(duplicate);
    console.log(chalk.green("removed notes successfully"));
  } else {
    console.log(chalk.red("No notes found!"));
  }
};

const modifyNotes = notes => {
  const json = JSON.stringify(notes);
  fs.writeFileSync("notes.json", json);
};

const readNote = () => {
  try {
    const notes = fs.readFileSync("notes.json");
    const obj = JSON.parse(notes);
    return obj;
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  console.log(chalk.green("your notes"));
  readNote().forEach(cur => {
    console.log(cur.title);
  });
};

const readNotes = title => {
  notes = readNote();

  const duplicate = notes.find(cur => cur.title === title);

  if (duplicate) {
    console.log(chalk.green.inverse(`Title: ${duplicate.title}`));
    console.log(`Title: ${duplicate.body}`);
  } else {
    console.log(chalk.red("no notes found!"));
  }
};

module.exports = {
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes
};
