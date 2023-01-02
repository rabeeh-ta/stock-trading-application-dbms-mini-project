const fs = require('fs');
const initSqlJs = require('sql.js');

const numGen = (min, max) => {
  let num = Math.random() * (max - min) + min;

  // Round the number to two decimal places
  num = Math.floor(num * 100) / 100;
  return num;
};

const loadData = () => {
  initSqlJs().then(function (SQL) {
    //! read the database to the JS memory
    const filebuffer = fs.readFileSync('./database.sqlite'); // location relative to the root file where the application runs
    const db = new SQL.Database(filebuffer);

    var readComp = db.prepare('SELECT * FROM US_COMPANIES;');

    var count = 1;
    while (readComp.step()) {
      var priceOfStock = numGen(10, 2500);
      var row = readComp.getAsObject();

      db.run(
        'INSERT INTO COMPANY_INDEXES values($cuid, $sl_no, $name, $symbol, $market, $no_equity,$price_yesterday,$price_today,$change_percentage)',
        {
          $cuid: row.usuid,
          $sl_no: count,
          $name: row.name,
          $symbol: row.symbol,
          $market: 'us',
          $no_equity: null,
          $price_yesterday: priceOfStock,
          $price_today: priceOfStock,
          $change_percentage: numGen(0, 6),
        }
      );
      count++;
    }

    var readComp = db.prepare('SELECT * FROM IND_COMPANIES;');
    while (readComp.step()) {
      var priceOfStock = numGen(10, 2500);
      var row = readComp.getAsObject();

      db.run(
        'INSERT INTO COMPANY_INDEXES values($cuid, $sl_no, $name, $symbol, $market, $no_equity,$price_yesterday,$price_today,$change_percentage)',
        {
          $cuid: row.inuid,
          $sl_no: count,
          $name: row.name,
          $symbol: row.symbol,
          $market: 'in',
          $no_equity: null,
          $price_yesterday: priceOfStock,
          $price_today: priceOfStock,
          $change_percentage: numGen(0, 6),
        }
      );
      count++;
    }

    //! write the database file back to storage from JS memory
    var data = db.export();
    var buffer = new Buffer.from(data);
    fs.writeFileSync('./database.sqlite', buffer);
  });
};

loadData();
