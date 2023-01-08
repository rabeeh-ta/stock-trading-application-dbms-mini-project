const fs = require('fs');
const initSqlJs = require('sql.js');

const dateObj = new Date();

const transactionsOnComp = (uuid, symbol) => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
      const db = new SQL.Database(filebuffer);
      var transactions = [];

      var stmt = db.prepare(
        'SELECT * FROM TRANSACTIONS WHERE symbol = $symbol AND uuid = $uuid;',
        { $symbol: symbol, $uuid: uuid }
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

const allTransactions = (uuid) => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
      const db = new SQL.Database(filebuffer);
      var transactions = [];

      var stmt = db.prepare('SELECT * FROM TRANSACTIONS WHERE uuid = $uuid;', {
        $uuid: uuid,
      });
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

// transactionsOnComp('iDwf2cfe7ZjgXBTTB3cgCA', 'AAPL');
module.exports = { transactionsOnComp, allTransactions };
