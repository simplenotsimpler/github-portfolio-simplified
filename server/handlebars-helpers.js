const Autolinker = require( 'autolinker' );



function addUri (input) {
  const autolinker = new Autolinker();

  return autolinker.link( input);
}

// handlebars helpers organization: https://stackoverflow.com/questions/38661295/node-express-handlebars-where-to-define-custom-helpers


//https://stackoverflow.com/questions/9011228/how-do-i-lowercase-a-field-using-handlebars-js/19836418
// https://stackoverflow.com/questions/18546510/can-we-register-a-custom-handlebars-helper-written-on-an-external-file
// Handlebars.registerHelper('toLowerCase', function(str) {
//   return str.toLowerCase();
// });

function toLowerCaseHbs(str) {
  return str.toLowerCase();
}


currentDate = new Date().toISOString().split('T')[0];

function formatYear(stringDate){
  return new Date(stringDate)
  .getFullYear()
  ;
}

function formatWorkDate(stringDate) {

  //try convert to date object
  const workDate = new Date(stringDate);

  //check if not a date, e.g. 'Present'
  if(isNaN(workDate)){
    return stringDate;
  } 

  return workDate
    .toLocaleDateString('default', {
      'month': 'short',
      'year': 'numeric'
    })
  ;
  
}

function cleanUri (stringUri){
  const url = new URL(stringUri);
  const hostName = url.hostname.replace('www.', '');
  const pathName = url.pathname;

  return shortUrl = hostName + pathName;
}

module.exports = {
  addUri,
  toLowerCaseHbs,
  formatWorkDate,
  formatYear,
  cleanUri
}