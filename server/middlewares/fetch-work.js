const axios = require('axios');
const currentDate = new Date().toISOString().split('T')[0];

const fetchWork = async (req, res, next) => {

  try {
    const api_key = process.env.MONGO_REALM_APP_API_KEY;
    let url = process.env.MONGO_REALM_BASE_URL; 

    url = `${url}/work`; 
   
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
      https://amberley.dev/blog/2020-09-07-conditionally-add-to-array-or-obj/
      https://www.kevinpeters.net/adding-object-properties-conditionally-with-es-6
    */
    /* 
      https://stackoverflow.com/questions/12192491/sort-array-by-iso-8601-date
      answered Jun 25 '19 at 9:26 icoum
      myArray.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });      
    
    */

    res.locals.work = 
      res.locals.work
      //if endDate missing, add endDate as currentDate
      .map(item => ({
        ...item,
        ...(!item.hasOwnProperty('endDate') && {endDate: new Date().toISOString().split('T')[0]})
      }))
      //sort by endDate
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
      //add present
      .map(item => ({
        ...item,
        ...(item.endDate === currentDate && {endDate: 'Present'})
      })); 

    next();

  }
  catch (error) {

    next(error);

  }
}

module.exports = fetchWork;

