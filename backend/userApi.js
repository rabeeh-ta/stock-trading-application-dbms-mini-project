const fs = require('fs');
const initSqlJs = require('sql.js');
const shortUuid = require('short-uuid');
const bcrypt = require('bcrypt');

const saltRounds = 10;

//* create USER / SIGNUP / REGISTER
const createUser = (fName, lName, email, password, dp_uri) => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
      const db = new SQL.Database(filebuffer);
      const userUuid = shortUuid.generate();

      //? check if user already exists
      let query = db.prepare('SELECT * FROM USERS WHERE email = $email ;');
      let queryResult = query.getAsObject({
        $email: email,
      });

      if (!queryResult.uuid) {
        //? register the user.
        bcrypt.hash(password, saltRounds, function (err, hash) {
          let query = db.run(
            'INSERT INTO USERS values($uuid, $fName, $lName, $email, $password_hash, $dp_uri)',
            {
              $uuid: userUuid,
              $fName: fName,
              $lName: lName,
              $email: email,
              $password_hash: hash,
              $dp_uri: dp_uri,
            }
          );
          //! write the database file back to storage from JS memory
          var data = db.export();
          var buffer = new Buffer.from(data);
          fs.writeFileSync('./backend/database.sqlite', buffer);
          //? function return  user created
          return res({
            status: 0,
            message: `User ${fName} Created.`,
            uuid: userUuid,
          });
        });
      } else {
        //? user already exists
        //! write the database file back to storage from JS memory
        var data = db.export();
        var buffer = new Buffer.from(data);
        fs.writeFileSync('./backend/database.sqlite', buffer);
        //? function return email already exists
        return res({
          status: 1,
          message: `User ${email} already exists.`,
        });
      }
    });
  });
};

const login = (email, password) => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite');
      const db = new SQL.Database(filebuffer);

      //? query and operation logic
      let query = db.prepare('SELECT * FROM USERS WHERE email = $email ;');
      let queryResult = query.getAsObject({
        $email: email,
      });

      //! write the database file back to storage from JS memory
      var data = db.export();
      var buffer = new Buffer.from(data);
      fs.writeFileSync('./backend/database.sqlite', buffer);

      //? function return and free memory
      query.free();
      //* there is a user with the email
      if (queryResult.uuid) {
        bcrypt.compare(
          password,
          queryResult.password_hash,
          function (err, result) {
            //* password correct
            if (result) {
              return res({
                status: 0,
                uuid: queryResult.uuid,
                first_name: queryResult.first_name,
                last_name: queryResult.last_name,
                email: queryResult.email,
                dp_uri: queryResult.dp_uri,
              });
              //* password wrong
            } else {
              return res({ status: 1, message: 'Wrong Password.' });
            }
          }
        );

        //* no user found with email
      } else {
        return res({ status: 1, message: 'No user found, Sign Up.' });
      }
    });
  });
};

// createUser(
//   'rahhuindio',
//   'niyaz',
//   'mohammed',
//   'niyaz@gmail.com',
//   'asfdafd',
//   'uri of proile'
// ).then((res, error) => {
//   console.log(res);
// });

// login('haneesh@gmail.com', 'asdfasdf').then((res, rej) => {
//   if (rej) {
//     console.log(rej);
//   }
//   console.log(res);
// });

module.exports = { createUser, login };
