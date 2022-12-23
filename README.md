# Stock Trading Application
Is a Desktop application built with electron and sqlite3, the database is stored locally, there are 500 comapnies in total that you can paper trade on, the app will call an API once a day to get the prices of the stocks, thats the only time the app will use internet.

## Install the Application
[Download the executable from releases]() for your platform.


## Project Details 
this is a DBMS project under VTU scheme for the part 2 section of DBMS labs, 
the tech that app uses:
- Electron.js to compile for the desktops
- SQLlite3 as database interfacing with sql.js module
- React with CDN for the UI and Bulma CSS for the components and style.

## Projuct Folder Structure

Folder `playground` `data_resource` are not required for the running of the application it is in the `.gitignore`
the basic files need for electron:
-   main.js
-   preload.js
-   index.html

The `backend` directory holds all the API functions that are used in the frontend to interact with the sqlite db, this folder also contains the `sqlite` database file.

## Run the Application
-   clone the git repo
-   `npm install`
-   `npm run start`
should run the electron start script and the app should be running

