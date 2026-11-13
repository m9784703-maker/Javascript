// Fixes:
// - Used async/await to ensure the password hash generation completes before assigning it.
// - Replaced .forEach() with a for...of loop, since forEach doesn't work well with async/await.
// - Moved operations into updateUsers(), making it an async function so that all promises resolve properly.
/*
Harsimran Kaur
Gurdeep Kaur
Amandeep Kaur
*/

const util = require('util');
const { pbkdf2, randomBytes } = require('node:crypto');
//Jadvinder Singh 
const users =[{"name":"MLewis","firstname":"Maureen","lastname":"Lewis","password":"","hash":"","salt":""}//,
  // {"name":"GKaur","firstname":"Gurdeep","lastname":"Kaur","password":"","hash":"","salt":""},
  // {"name":"AKaur","firstname":"Amandeep","lastname":"Kaur","password":"","hash":"","salt":""}
  // {"name":"AChauhan","firstname":"Amandeep","lastname":"Chauhan","password":"","hash":"","salt":""},
  // {"name":"JDeol","firstname":"Jasdeep","lastname":"Deol","password":"","hash":"","salt":""},
  // {"name":"HFrancis","firstname":"Herita","lastname":"Francis","password":"","hash":"","salt":""},
  // {"name":"GGarg","firstname":"Gaurav","lastname":"Garg","password":"","hash":"","salt":""},
  // {"name":"TKaur","firstname":"Taranveer","lastname":"Kaur","password":"","hash":"","salt":""},
  // {"name":"SKaur","firstname":"Sahib","lastname":"Kaur","password":"","hash":"","salt":""},
  // {"name":"TKaur1","firstname":"Tejinder","lastname":"Kaur","password":"","hash":"","salt":""},
  // {"name":"CMccombe","firstname":"Cheryl","lastname":"Mccombe","password":"","hash":"","salt":""},
  // {"name":"SMckay","firstname":"Stacy","lastname":"Mckay","password":"","hash":"","salt":""},
  // {"name":"INiazi","firstname":"Irum","lastname":"Niazi","password":"","hash":"","salt":""},
  // {"name":"APeart","firstname":"Abbeygale","lastname":"Peart","password":"","hash":"","salt":""},
  // {"name":"ARandhawa","firstname":"Abhijot","lastname":"Randhawa","password":"","hash":"","salt":""},
  // {"name":"MSharaf","firstname":"Mariam","lastname":"Sharaf","password":"","hash":"","salt":""},
  // {"name":"GSingh","firstname":"Gurdeep","lastname":"Singh","password":"","hash":"","salt":""},
  // {"name":"ASingh","firstname":"Amandeep","lastname":"Singh","password":"","hash":"","salt":""},
  // {"name":"ASingh1","firstname":"Amritpal","lastname":"Singh","password":"","hash":"","salt":""},
  // {"name":"GSingh","firstname":"Gurjeet","lastname":"Singh","password":"","hash":"","salt":""},
  // {"name":"JSingh","firstname":"Jagminder","lastname":"Singh","password":"","hash":"","salt":""},
  // {"name":"RSingh","firstname":"Ranjit","lastname":"Singh","password":"","hash":"","salt":""},
  // {"name":"HSingh","firstname":"Harman","lastname":"Singh","password":"","hash":"","salt":""},
  // {"name":"RSomal","firstname":"Rupinder","lastname":"Somal","password":"","hash":"","salt":""
  ]



async function generateKey(password, salt) {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey.toString('base64')); // Convert buffer to base64 string
    });
  });
}

async function updateUsers() {
  for (const element of users) {
    let pw = Math.floor(Math.random() * 10000);
    if (pw < 1000)
       pw+=1000; 
    element.password = pw;

    let salt = randomBytes(20).toString('base64').slice(0, 16);
    element.salt = salt;

    element.hash = await generateKey(pw.toString(), salt);
  }

   console.log(JSON.stringify(users));

   const fs = require("fs");
   const fileName = "jsonFileUsers";
   
   fs.writeFileSync(fileName, JSON.stringify(users));

}

updateUsers();
