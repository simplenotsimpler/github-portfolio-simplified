const axios = require('axios');
const currentDate = new Date().toISOString().split('T')[0];

const fetchWorkByCompany = async (req, res, next) => {

  try {
    const api_key = process.env.MONGO_REALM_APP_API_KEY;
    let url = process.env.MONGO_REALM_BASE_URL; 

    url = `${url}/work-by-company`; 
   
    let config = {
      method: 'get',
      url: `${url}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'api-key': `${api_key}`
      },

    };

    const axiosResponse = await axios(config);

    res.locals.work=axiosResponse.data;
    
    /* 
    https://stackoverflow.com/questions/12192491/sort-array-by-iso-8601-date
    answered Jun 25 '19 at 9:26 icoum
    myArray.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });      
    
    */
    res.locals.work.sort((a, b) => new Date(b.companyEndDate) - new Date(a.companyEndDate));

    /* 
      replace forEach with for...of loop to fix sort bug
      - sort bug only appeared on Heroku
      - occurred when open the https://github-portfolio-simplified.herokuapp.com/ link or refreshed
      - occurred in Firefox and Chrome

    */

    for await (const el of res.locals.work) { 
      el.positions.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
      
      for await (const position of el.positions) {
        if(position.endDate === el.companyEndDate){
          el.location = position.location;
        }
        
        if(position.endDate === currentDate){
          position.endDate = 'Present';
        } 
      }
    }
    
    next();

  }
  catch (error) {

    next(error);

  }
}

module.exports = fetchWorkByCompany;

