# Archived

This project is no longer being maintained. Check out the [React version of my portfolio](http://simplenotsimpler.com) and [the code for it](https://github.com/simplenotsimpler/sns-site-react).

# Simple GitHub-based Portfolio

Simple Heroku-hosted Node/Express app that combines pinned GitHub repos with MongoDB Atlas data fetched via [portfolio-db-api-v1](https://github.com/simplenotsimpler/portfolio-db-api-v1) into a portfolio website.

## Details:

- Fetches pinned GitHub repos using the [GitHub GraphQL API](https://docs.github.com/en/graphql).
- Fetches other portfolio data via a [MongoDB Realm App API](https://github.com/simplenotsimpler/portfolio-db-api-v1) which serves data from a MongoDB Atlas database (free tier).

## Notes:

- MVC architecture is overkill for this small project.
- MongoDB Realm App API has these advantages:
  - Minimizes security issues while maintaining free-tier hosting flexibility. For details, see [portfolio-db-api](https://github.com/simplenotsimpler/portfolio-db-api).
  - Eliminates the need to use the MongoClient or Mongoose for simple GET requrests.

# License

This project is [MIT licensed](./LICENSE).
