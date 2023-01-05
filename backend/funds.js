const fs = require('fs');
const initSqlJs = require('sql.js');
const shortUuid = require('short-uuid');
var DateTime = require('datetime-js');

const dateObj = new Date();
const todayDate = DateTime(dateObj, '%d-%m-%Y');

const fundTransaction = (uuid, type, amount) => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
      const db = new SQL.Database(filebuffer);
      const uniqueId = shortUuid.generate();

      let query = db.run(
        'INSERT INTO FUND_TRANSACTIONS values($tuid, $uuid, $type, $amount, $date)',
        {
          $tuid: uniqueId,
          $uuid: uuid,
          $type: type,
          $amount: amount,
          $date: todayDate,
        }
      );

      //! write the database file back to storage from JS memory
      var data = db.export();
      var buffer = new Buffer.from(data);
      fs.writeFileSync('./backend/database.sqlite', buffer);

      return res({
        status: 200,
        message: 'Fund Transactions Successful.',
        id: uniqueId,
      });
    });
  });
};

const fundTransactionHistory = (uuid) => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
      const db = new SQL.Database(filebuffer);
      var transactions = [];

      var stmt = db.prepare(
        'SELECT * FROM FUND_TRANSACTIONS WHERE uuid = $uuid;',
        { $uuid: uuid }
      );
      while (stmt.step()) {
        var row = stmt.getAsObject();
        transactions.push(row);
      }

      //! write the database file back to storage from JS memory
      var data = db.export();
      var buffer = new Buffer.from(data);
      fs.writeFileSync('./backend/database.sqlite', buffer);
      return res(transactions);
    });
  });
};

module.exports = { fundTransaction, fundTransactionHistory };
