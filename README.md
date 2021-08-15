# Simple GitHub-based Portfolio
Simple Node/Express app which combines portfolio data stored in a MongoDB Atlas database with pinned GitHub repos and renders into a Portfolio website: http://simplenotsimpler.com.

## Details:
* Fetches pinned GitHub repos using the [GitHub GraphQL API](https://docs.github.com/en/graphql).  
* Fetches other portfolio data via a [MongoDB Realm App API] (https://github.com/simplenotsimpler/portfolio-db-api) which serves data from a MongoDB Atlas database (free tier). 

## Notes: 
* Minimizes security issues while maintaining free-tier hosting flexibility. For details, see [portfolio-db-api] (https://github.com/simplenotsimpler/portfolio-db-api).
* MVC architecture is overkill for this small project.
* Using the MongoClient or Mongoose is overkill for simple GET requests.

# License
This project is [MIT licensed](./LICENSE).