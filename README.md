# Simple GitHub-based Portfolio
Simple Node/Express app hosted on Heroku which combines portfolio data stored in a MongoDB Atlas database with pinned GitHub repos and renders into a Portfolio website. MongoDB Atlas data fetched via [portfolio-db-api-v1](https://github.com/simplenotsimpler/portfolio-db-api-v1).

## Live Site:
http://simplenotsimpler.com

## Details:
* Fetches pinned GitHub repos using the [GitHub GraphQL API](https://docs.github.com/en/graphql).  
* Fetches other portfolio data via a [MongoDB Realm App API](https://github.com/simplenotsimpler/portfolio-db-api) which serves data from a MongoDB Atlas database (free tier). 

## Notes: 
* MVC architecture is overkill for this small project.
* MongoDB Realm App API has these advantages:
  * Minimizes security issues while maintaining free-tier hosting flexibility. For details, see [portfolio-db-api](https://github.com/simplenotsimpler/portfolio-db-api).
  * Eliminates the need to use the MongoClient or Mongoose for simple GET requrests.

# License
This project is [MIT licensed](./LICENSE).