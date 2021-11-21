const axios = require('axios');

const fetchGitHub = async (req, res, next) => {

  try {
    const token = process.env.GH_TOKEN;
    const url = process.env.GH_URL; 
  
    //MAYBE: remove repositoryTopics? otherwise display
    const ghQueryJSON = `
    {
      "query": "query {viewer { githubName: name githubLink: url email pinnedItems(first: 10) {repos: nodes { ... on Repository { name description url homepageUrl repositoryTopics(first: 20) { nodes { topic { name } } } languages(first: 20, orderBy: {field: SIZE, direction: DESC}) { languageList:edges {language: node { name } } } } } } } }"
    }
    `;
  
   
    let config = {
      method: 'post',
      url: `${url}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${token}`
      },
      data: ghQueryJSON,
      timeout: 3000
    };

    const axiosResponse = await axios(config);

    const {data: {viewer: {githubName, githubLink, email, pinnedItems: {repos}}}}=axiosResponse.data;
    
  res.locals.github = {      
      githubName,
      email,
      githubLink,
      repos
    }

    next();

  }
  catch (error) {

    next(error);

  }
}

module.exports = fetchGitHub;