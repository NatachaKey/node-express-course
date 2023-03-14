const { writeFile } = require("fs").promises;
const os = require("os");
const greeting = require("./practice2.js");

//console.log(greeting);

const user = os.userInfo().username;
//console.log(user)

const makeFile = async () => {
  try {
    await writeFile("./content/practice.txt", `${greeting} ${user}.`);
  } catch (error) {
    console.log(error);
  }
};

makeFile();
