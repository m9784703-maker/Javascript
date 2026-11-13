const fs = require('fs');

//const files = fs.readdirSync('./myFolder');

const dir = '//dwspyramid/FTP/Genesco/Live/Out/DDL/MH';


let files = fs.readdirSync(dir);

files = files.sort((a, b) => a.localeCompare(b));

console.log(files);