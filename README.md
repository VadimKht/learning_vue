# My vue project for learning
Uses frontend, backend, mysql database, and now works in docker.    
To run it, open terminal up, type in: `docker compose up --build`    
Don't forget to bring it down later using `docker compose down -v`, -v removes the volume mysql creates.  
Then you open localhost:5173 in your browser. It may take a bit for mysql server to start up and for you to connect to backend though.  

## Purpose and additional information
Proof of concept learning material on backend-frontend and mysql server, and vue. The frontend runs on dev build and it's not meant to be in production - the password encryption code does nothing.  
P.S. the node modules are standardized to be not included in source codes - so i didn't add those. It makes docker spend a while on initial build, but if you want to change that - just manually npm init in frontend and backend directories, then open their dockerfiles and remove the npm init part

## Stack
General: Docker, HTML, CSS, JS  
Front end: axios, sqlite3, vue, vue-router, vite  
Back end: express, mysql2, sequelize
