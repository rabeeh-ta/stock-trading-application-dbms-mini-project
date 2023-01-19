const { contextBridge } = require('electron');
const { login, createUser } = require('./backend/userApi');
const {
  getIndCompanies,
  getUsCompanies,
  getCompanyIndexes,
  currentStockPrice,
} = require('./backend/queryCompanies');
const { executeOrder } = require('./backend/orders');
const {
  transactionsOnComp,
  allTransactions,
} = require('./backend/portfolioQueries');
const { fundTransaction, fundTransactionHistory } = require('./backend/funds');

const fs = require('fs');
const initSqlJs = require('sql.js');

// when every time the app loads calculate new prices for the stocks.
const changePercentFunc = (min, max) => {
  let num = Math.random() * (max - min) + min;
  num = Math.floor(num * 100) / 100;
  if (Math.round(Math.random()) == 1) {
    num -= num * 2;
  }
  return (num / 100).toFixed(4);
};

const marketSimulation = () => {
  initSqlJs().then(function (SQL) {
    //! read the database to the JS memory
    const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
    const db = new SQL.Database(filebuffer);

    var comp = db.prepare('SELECT * FROM COMPANY_INDEXES;');

    var count = 1;
    while (comp.step()) {
      var row = comp.getAsObject();
      var changePercent = changePercentFunc(0, 1);
      var price_yesterday = row.price_today;
      var changeAmount = (row.price_today * Number(changePercent)).toFixed(2);
      var price_today = Number(
        (row.price_today + Number(changeAmount)).toFixed(2)
      );

      db.run(
        'UPDATE COMPANY_INDEXES SET price_yesterday = $price_yesterday, price_today = $price_today,change_percentage = $change_percentage WHERE sl_no = $sl_no',
        {
          $price_yesterday: price_yesterday,
          $price_today: price_today,
          $change_percentage: Number((changePercent * 100).toFixed(2)),
          $sl_no: row.sl_no,
        }
      );
      count++;
    }

    //! write the database file back to storage from JS memory
    var data = db.export();
    var buffer = new Buffer.from(data);
    fs.writeFileSync('./backend/database.sqlite', buffer);
  });
};

marketSimulation();
contextBridge.exposeInMainWorld('backend', {
  login: login,
  createUser: createUser,
  getIndCompanies: getIndCompanies,
  getUsCompanies: getUsCompanies,
  getCompanyIndexes: getCompanyIndexes,
  executeOrder: executeOrder,
  transactionsOnComp: transactionsOnComp,
  fundTransaction: fundTransaction,
  fundTransactionHistory: fundTransactionHistory,
  allTransactions: allTransactions,
  currentStockPrice: currentStockPrice,
});
