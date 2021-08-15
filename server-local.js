require('dotenv').config();

const MODE = process.env.NODE_ENV || 'development';
const PORT=process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// if the Promise is rejected this will catch it. throwing to unhandled exception since in Node 15 and higher these will be considered exceptions anyways and don't need to be handled any differently.
process.on('unhandledRejection', error => {
  throw error;
 })
 
 process.on('uncaughtException', (error, origin) => {

  console.log();

  console.error(`✘ ${origin} !! Shutting down server...`);
  console.error(error);
  
  console.log();

  process.exit(1);
  
 })

//import app
const app = require('./server/app');

const server = app.listen(PORT, () => {
  console.log(`✔ Mode: ${MODE}`);
  console.log(`✔ Endpoint Base URL: http://${HOST}:${PORT}`);  
});