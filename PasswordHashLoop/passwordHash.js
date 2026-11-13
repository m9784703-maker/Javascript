const users = [
{name: "NMahadeo@dwslogistics.com", password: "", hash: "", salt: "" },
{name: "imoncayo@dwslogistics.com", password: "", hash: "", salt: "" }
];


const util = require('util');
const {
  pbkdf2,
  randomBytes,
} = require('node:crypto');





users.forEach((element) => {

    let pw  = Math.floor(Math.random()*10000);

    element.password = pw;
    
    salt = (randomBytes)(20).toString('base64').slice(0,16);

    x = generateKey(pw.toString(), salt)
        .then((derivedKey) => {return derivedKey})
        .catch((error) => console.error('Error:', error));    

    element.salt = salt;
    element.hash = x;

}   );


    console.log(users);


async function generateKey(password, salt) {
    return new Promise((resolve, reject) => {
        pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            else resolve(derivedKey.toString('base64')); // Convert the buffer to a hex string
        });
    });
}
// const fs = require("fs")

// const filePath = "password.txt"

// fs.writeFile(filePath, content, err => {
// if (err) {
// console.error('Error writing file:', err);
// } else {
// console.log('File written successfully!');
// }});

/*

// Generate the PBKDF2 hash and return the derived key
function generateKey(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keyLength, digest, (err, derivedKey) => {
            if (err) reject(err);
            else resolve(derivedKey.toString('hex')); // Convert the buffer to a hex string
        });
    });
}

// Example usage
generateKey(password, salt)
    .then((derivedKey) => console.log('Derived Key:', derivedKey))
    .catch((error) => console.error('Error:', error));

    */