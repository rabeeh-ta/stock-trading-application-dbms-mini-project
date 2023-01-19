-- contains info about the users of the application
CREATE TABLE USERS(
    uuid VARCHAR(25) PRIMARY KEY NOT NULL,
    first_name VARCHAR(30)  ,
    last_name VARCHAR(30) ,
    email VARCHAR(250) ,
    password_hash TEXT(255)	,
    dp_uri  LONGTEXT	  -- convert img to dataURI and store in db
);

-- holds data of s&p500 companies
CREATE TABLE US_COMPANIES(
    usuid VARCHAR(25)  PRIMARY KEY NOT NULL,
    name VARCHAR(200),
    symbol VARCHAR(10),
    industry VARCHAR(50),
    description TEXT(255),
    no_equity BIGINT (8o: +-9.10^18) -- total no of outstanding shares to calculate the marketcap
);

-- holds data of nifty 100 companies
CREATE TABLE IND_COMPANIES(
    inuid VARCHAR(25)  PRIMARY KEY NOT NULL,
    name VARCHAR(200,
    symbol VARCHAR(10),
    industry VARCHAR(50),
    description TEXT(255),
    no_equity BIGINT (8o: +-9.10^18)
);

-- holds all companies in US_COMPANIES and IND_COMPANIES will hold the price of the stocks for the day and the change
CREATE TABLE COMPANY_INDEXES(
    cuid VARCHAR(25)  PRIMARY KEY NOT NULL,
    name VARCHAR(200,
    symbol VARCHAR(10,  -- symbol symbol of stock 
    no_equity BIGINT (8o: +-9.10^18),
    price INTEGER, -- todays price of the stock
    change INTEGER, -- yesturday and today price change
    FOREIGN KEY (cuid) REFERENCES US_COMPANIES(usuid),
    FOREIGN KEY (cuid) REFERENCES IND_COMPANIES(inuid)
);

-- will have each info about each transactions BUY or SELL and the qty and amount at which the order was exicuted.
CREATE TABLE TRANSACTIONS(
    tuid VARCHAR(25)  PRIMARY KEY NOT NULL,
    uuid VARCHAR(25),
    symbol VARCHAR(10),
    order_type VARCHAR(5), -- buy or sell
    date TEXT(255), -- ('yyyy-MM-dd HH:mm:ss') ISO8601
    qty INTEGER,
    price INTEGER, -- price of stock while the transaction
    FOREIGN KEY (uuid) REFERENCES USERS(uuid)
);

-- the funds that the users have added to their account for trading the stocks
CREATE TABLE FUND_TRANSACTIONS(
    tuid VARCHAR(25)  PRIMARY KEY NOT NULL,
    uuid VARCHAR(25), -- who made the deposite
    type VARCHAR(10), -- DEPosite or WITHdrawal 
    amount INTEGER,
    date DATE -- ('dd-mm-yyyy') ISO8601
);


