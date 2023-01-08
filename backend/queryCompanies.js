const fs = require('fs');
const initSqlJs = require('sql.js');

const getUsCompanies = () => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
      const db = new SQL.Database(filebuffer);
      const usCompanies = [];

      var stmt = db.prepare('SELECT * FROM US_COMPANIES;');
      var count = 1;
      while (stmt.step()) {
        var row = stmt.getAsObject();
        usCompanies.push({ ...row, id: count });
        count++;
      }

      //! write the database file back to storage from JS memory
      var data = db.export();
      var buffer = new Buffer.from(data);
      fs.writeFileSync('./backend/database.sqlite', buffer);
      return res(usCompanies);
    });
  });
};

const getIndCompanies = () => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
      const db = new SQL.Database(filebuffer);
      const indCompanies = [];

      var stmt = db.prepare('SELECT * FROM IND_COMPANIES;');
      var count = 1;
      while (stmt.step()) {
        var row = stmt.getAsObject();
        indCompanies.push({ ...row, id: count });
        count++;
      }

      //! write the database file back to storage from JS memory
      var data = db.export();
      var buffer = new Buffer.from(data);
      fs.writeFileSync('./backend/database.sqlite', buffer);
      return res(indCompanies);
    });
  });
};

const getCompanyIndexes = () => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
      const db = new SQL.Database(filebuffer);
      const indCompanies = [];

      var stmt = db.prepare('SELECT * FROM COMPANY_INDEXES;');
      while (stmt.step()) {
        var row = stmt.getAsObject();
        indCompanies.push(row);
      }

      //! write the database file back to storage from JS memory
      var data = db.export();
      var buffer = new Buffer.from(data);
      fs.writeFileSync('./backend/database.sqlite', buffer);
      return res(indCompanies);
    });
  });
};

const currentStockPrice = (symbol) => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
      const db = new SQL.Database(filebuffer);
      const usCompanies = [];

      var query = db.prepare(
        'SELECT * FROM COMPANY_INDEXES WHERE symbol = $symbol;'
      );
      let queryResult = query.getAsObject({
        $symbol: symbol,
      });

      //! write the database file back to storage from JS memory
      var data = db.export();
      var buffer = new Buffer.from(data);
      fs.writeFileSync('./backend/database.sqlite', buffer);
      return res(queryResult);
    });
  });
};

module.exports = {
  getIndCompanies,
  getUsCompanies,
  getCompanyIndexes,
  currentStockPrice,
};
