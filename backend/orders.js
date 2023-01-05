const fs = require('fs');
const initSqlJs = require('sql.js');
const shortUuid = require('short-uuid');
var DateTime = require('datetime-js');

const dateObj = new Date();
const todayDate = DateTime(dateObj, '%d-%m-%Y');

const executeOrder = (uuid, symbol, qty, price, order_type) => {
  return new Promise((res, rej) => {
    initSqlJs().then(function (SQL) {
      //! read the database to the JS memory
      const filebuffer = fs.readFileSync('./backend/database.sqlite'); // location relative to the root file where the application runs
      const db = new SQL.Database(filebuffer);
      const uniqueId = shortUuid.generate();

      let query = db.run(
        'INSERT INTO TRANSACTIONS values($tuid, $uuid, $symbol, $order_type, $date, $qty,$price)',
        {
          $tuid: uniqueId,
          $uuid: uuid,
          $symbol: symbol,
          $order_type: order_type,
          $date: todayDate,
          $qty: qty,
          $price: price,
        }
      );

      //! write the database file back to storage from JS memory
      var data = db.export();
      var buffer = new Buffer.from(data);
      fs.writeFileSync('./backend/database.sqlite', buffer);

      return res({ status: 200, message: 'Order Executed.', id: uniqueId });
    });
  });
};

module.exports = { executeOrder };
