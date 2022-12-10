import sqlite3 from 'sqlite3';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { rejects } from 'assert';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//? create a user
function createUser(fname, lname, email, pass, dpUri) {
  // open the database
  const db = new sqlite3.Database('./test.db');

  const sql = `INSERT INTO USERS VALUES (?,?,?,?,?,?)`;
  const params = [nanoid(15), fname, lname, email, pass, dpUri];

  db.run(sql, params, (error) => {
    if (error) {
      return console.log(error);
    }
  });

  // close the database connection
  db.close();
}

//? insert into US companeis
function insertUsCompany(name, symbol, industry, description) {
  // open the database
  const db = new sqlite3.Database('./database.db');

  const sql = `INSERT INTO US_COMPANIES VALUES (?,?,?,?,?,?)`;
  const params = [nanoid(15), name, symbol, industry, description, null];

  db.run(sql, params, (error) => {
    if (error) {
      return console.log(error);
    }
  });

  // close the database connection
  db.close();
}

//? insert into IND companeis
function insertIndCompany(name, symbol, industry) {
  // open the database
  const db = new sqlite3.Database('./database.db');

  const sql = `INSERT INTO IND_COMPANIES VALUES (?,?,?,?,?,?)`;
  const params = [nanoid(15), name, symbol, industry, null, null];

  db.run(sql, params, (error) => {
    if (error) {
      return console.log(error);
    }
  });

  // close the database connection
  db.close();
}

fs.createReadStream(path.join(__dirname, 'nifty100.csv'))
  .pipe(csv.parse({ headers: true }))
  .on('data', (row) => {
    insertIndCompany(row['Shortname'], row['Symbol'], row['Industry']);
  })
  .on('end', () => {
    console.log('done uploading');
  });
