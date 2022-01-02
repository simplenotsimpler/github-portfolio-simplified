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

    res.locals.workByCompany=axiosResponse.data;
    
    /* 
    https://stackoverflow.com/questions/12192491/sort-array-by-iso-8601-date
    answered Jun 25 '19 at 9:26 icoum
    myArray.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });      
    
    */

    /* 
      https://amberley.dev/blog/2020-09-07-conditionally-add-to-array-or-obj/
      https://www.kevinpeters.net/adding-object-properties-conditionally-with-es-6
    */

    //chaining eliminates race condition vs. separate for awaits
    res.locals.workByCompany = 
      res.locals.workByCompany
        //sort companies by date
        .sort((a, b) => new Date(b.companyEndDate) - new Date(a.companyEndDate))
        .map(el => ({
        ...el,
        ...({positions: 
          el.positions
            //sort positions by date
            .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
            //replace with present
            .map (position => ({
              ...position,
              ...(position.endDate === currentDate && {endDate: 'Present'})
            }))
        }),
        //add company location
        ...({location: el.positions.find(position => position.endDate === el.companyEndDate).location})
    }));


    // res.locals.workByCompany = res.locals.workByCompany.map(el )
    // for await (const el of res.locals.workByCompany) { 
    //   // el.positions.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));      
      
    //   el.positions = el.positions.map (position => ({
    //     ...position,
    //     ...(position.endDate === currentDate && {endDate: 'Present'})
    //   }));        
    //   }

    
    next();

  }
  catch (error) {

    next(error);

  }
}

module.exports = fetchWorkByCompany;

