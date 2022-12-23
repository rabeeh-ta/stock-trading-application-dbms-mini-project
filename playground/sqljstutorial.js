const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const initSqlJs = require('sql.js');

//* create USER / SIGNUP / REGISTER
function createUser(uuid, fName, lName, email, password, uri) {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('database.sqlite');
      const db = new SQL.Database(filebuffer);

      //? query and operation logic
      let query = db.prepare(
        'insert into users values($uuid, $fName, $lName, $email, $password, $uri)'
      );

      let result = query.getAsObject({
        $uuid: uuid,
        $fName: fName,
        $lName: lName,
        $email: email,
        $password: password,
        $uri: uri,
      });
      console.log(result);

      //! write the database file back to storage from JS memory
      var data = db.export();
      var buffer = new Buffer.from(data);
      fs.writeFileSync('database.sqlite', buffer);

      //? function return and free memory
      query.free;

      if (result.uuid) {
        return res(result);
      } else {
        return res({});
      }
    });
  });
}

function login(email, password) {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('database.sqlite');
      const db = new SQL.Database(filebuffer);

      //? query and operation logic
      let query = db.prepare('SELECT * FROM USERS WHERE email = $email ;');

      let result = query.getAsObject({
        $email: email,
      });

      //! write the database file back to storage from JS memory
      var data = db.export();
      var buffer = new Buffer.from(data);
      fs.writeFileSync('database.sqlite', buffer);

      //? function return and free memory
      query.free;

      if (result.uuid) {
        return res(result);
      } else {
        return res({});
      }
    });
  });
}

// insertUsers(
//   'ase',
//   'beeb',
//   'buu',
//   'muni@gmail.com',
//   'asdfasdf',
//   'uri of profile'
// ).then((resolve) => console.log(resolve));

login('rabeehwork@gmail.com', 'asdfasdf').then((res, rej) => {
  if (rej) {
    console.log(rej);
  }
  console.log(res);
});
