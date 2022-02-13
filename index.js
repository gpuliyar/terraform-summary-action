const fs = require('fs');
const moment = require('moment');
const core = require('@actions/core');

const main = async() => {
  try {
    const fileName = core.getInput('file-name', {required: true});
    const getAllFiles = function(dirPath, arrayOfFiles) {
      files = fs.readdirSync(dirPath);
      arrayOfFiles = arrayOfFiles || [];
      files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
          arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
        }
      });
      return arrayOfFiles
    }
    console.log(getAllFiles('./'));
  } catch(error) {
    console.log(error);
  }
}

main();
