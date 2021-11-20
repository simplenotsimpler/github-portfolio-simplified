const axios = require('axios');

const fetchEducation = async (req, res, next) => {

  try {
    const api_key = process.env.MONGO_REALM_APP_API_KEY;
    let url = process.env.MONGO_REALM_BASE_URL; 

    url = `${url}/education`; 
   
    let config = {
      method: 'get',
      url: `${url}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'api-key': `${api_key}`
      },

    };

    const axiosResponse = await axios(config);

    res.locals.education=axiosResponse.data;

    res.locals.education.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

    next();

  }
  catch (error) {

    next(error);

  }
}

module.exports = fetchEducation;

