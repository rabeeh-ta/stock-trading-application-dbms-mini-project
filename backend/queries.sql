-- contains info about the users of the application
CREATE TABLE USERS(
    uuid TEXT PRIMARY KEY NOT NULL,
    first_name TEXT ,
    last_name TEXT,
    email TEXT,
    password_hash TEXT,
    dp_uri  TEXT  -- convert img to dataURI and store in db
);

-- holds data of s&p500 companies
CREATE TABLE US_COMPANIES(
    usuid TEXT PRIMARY KEY NOT NULL,
    name TEXT,
    symbol TEXT,
    industry TEXT,
    description TEXT,
    no_equity REAL -- total no of outstanding shares to calculate the marketcap
);

-- holds data of nifty 100 companies
CREATE TABLE IND_COMPANIES(
    inuid TEXT PRIMARY KEY NOT NULL,
    name TEXT,
    symbol TEXT,
    industry TEXT,
    description TEXT,
    no_equity REAL
);

-- holds all companies in US_COMPANIES and IND_COMPANIES will hold the price of the stocks for the day and the change
CREATE TABLE COMPANY_INDEXES(
    cuid TEXT PRIMARY KEY NOT NULL,
    name TEXT,
    symbol TEXT,  -- symbol symbol of stock 
    no_equity REAL,
    price INTEGER, -- todays price of the stock
    change INTEGER, -- yesturday and today price change
    FOREIGN KEY (cuid) REFERENCES US_COMPANIES(usuid),
    FOREIGN KEY (cuid) REFERENCES IND_COMPANIES(inuid)
);

-- will have each info about each transactions BUY or SELL and the qty and amount at which the order was exicuted.
CREATE TABLE TRANSACTIONS(
    tuid TEXT PRIMARY KEY NOT NULL,
    uuid TEXT,
    symbol TEXT,
    order_type TEXT, -- buy or sell
    date TEXT, -- ('yyyy-MM-dd HH:mm:ss') ISO8601
    qty INTEGER,
    price INTEGER, -- price of stock while the transaction
    FOREIGN KEY (uuid) REFERENCES USERS(uuid)
);

-- the funds that the users have added to their account for trading the stocks
CREATE TABLE FUND_TRANSACTIONS(
    tuid TEXT PRIMARY KEY NOT NULL,
    uuid TEXT, -- who made the deposite
    type TEXT, -- DEPosite or WITHdrawal 
    amount INTEGER,
    date TEXT -- ('dd-mm-yyyy') ISO8601
);


--! INSERT QUERIES
INSERT INTO US_COMPANIES VALUES("","TESLA INC", "TESLA", 21323132132124)