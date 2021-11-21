const express = require('express');
const path = require('path');
const hbs  = require('express-handlebars');
const hbsHelpers = require('./handlebars-helpers');

const { defaultErrorHandler, renderError } = require('./middlewares/error-handlers.js');

//standard security imports
const secure = require('ssl-express-www');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const rateLimiter = require('./middlewares/rate-limiter');

//import data
const {basics} = require('./data/basics.json');
const fetchSkills = require('./middlewares/fetch-skills');
const fetchGitHub = require('./middlewares/fetch-github');
const fetchWork = require('./middlewares/fetch-work');
const fetchEducation = require('./middlewares/fetch-education');

//set app
const app = express();

// need this for environments like Heroku
app.enable('trust proxy');

if(process.env.NODE_ENV === 'production') {
  app.use(secure);
}

/* 
  NOTE: 
    can't use underscore in file names in Handlebars
    causes can't find file error
    https://github.com/handlebars-lang/handlebars.js/issues/1730
*/
//set view engine to handlebars and use file extension hbs
app.engine('hbs', hbs({  
  defaultLayout: 'layout',
  extname: '.hbs',
  helpers: hbsHelpers
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Enable CORS
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set security headers
/* 
  NOTE: when enable helmet get content security policy messages in Firefox. Do not get these in Chrome.
    Content Security Policy: Couldn’t process unknown directive ‘script-src-attr’
    Content Security Policy: The page’s settings blocked the loading of a resource at inline (“script-src”).
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src-attr#browser_compatibility
*/
app.use(helmet());

// Rate limiting
if (process.env.NODE_ENV === 'production') {
  app.use(rateLimiter);
}

//basics
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());



app.get('/', fetchGitHub, fetchSkills, fetchWork, fetchEducation, async (req, res, next) => {
  try {

    //easier to read with assignments up here than in the res.render
    const skills = res.locals.skills;
    const github = res.locals.github;
    const work = res.locals.work;
    const education = res.locals.education;
    
    res.status(200).render('index', {
      basics, 
      github, 
      skills,
      work,
      education, 
      siteName: `${github.githubName} | Portfolio`,
      isError: false

    });   

  } catch (error) {
    next(error);
  }


});

app.get('/resume', fetchGitHub, fetchSkills, fetchWork, fetchEducation, async (req, res, next) => {
  try {

    //easier to read with assignments up here than in the res.render
    const skills = res.locals.skills;
    const github = res.locals.github;
    const work = res.locals.work;
    const education = res.locals.education;
    
    res.status(200).render('resume', {
      realName: process.env.REAL_NAME,
      basics, 
      github, 
      skills,
      work,
      education, 
      siteName: `${github.githubName} | Resume`,
      isError: false,
      layout: false,
      host: req.headers.host
    });   

  } catch (error) {
    next(error);
  }


});

/* ==================================== */
/*   INFORMAL UNHANDLED TESTING         */
/* ==================================== */
// function SomeResource() {
//   // Initially set the loaded status to a rejected promise
//   this.loaded = Promise.reject(new Error('Resource not yet loaded!'));
// }

// const resource = new SomeResource();

/* ==================================== */
/*  END INFORMAL UNHANDLED TESTING      */
/* ==================================== */


//arrow function version of example in: 
// https://expressjs.com/en/starter/faq.html
app.use((req, res, next) => {
  renderError(req, res, 404, 'Page Not Found', `The page you are looking for was moved, removed, renamed or might never existed.`, `Go back to <a href="/">home</a> page `);

});

// Final middleware is our catch-all error handler
app.use(defaultErrorHandler);

module.exports = app;