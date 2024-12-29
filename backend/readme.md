## Backend in node expressJS boilerplate

- three utils (async handler, api response, api error)
- db is connected (mongoDB, anish's org, mongoDB, \<database-name>)
- change the database name in [constants.js](/src/constants.js)
- create models in [/models](/src/models/)
  - an example schema is created in [example.model.js](/src/models/example.model.js)
  - use it in controllers to talk to create, update, delete,etc entry in db
- example controller [/controllers/example.controller.js](/src/controllers/example.controller.js)
  - controllers are basically functions
  - they are called in routes
- example route [/routes/example.routes.js](/src/routes/example.routes.js)
  - routes
  - first imported in [app.js](/src/app.js)
  - and used as a middleware, with the base route that gives control to the router
  - the [router file](/src/routes/example.routes.js) uses the route function of express router
  - it calls another route on the base route
  - then a get method which calls the controller function
  - the controller function is returning status 200 and message ok
- communicating to database
  - in [example.controller.js](/src/controllers/example.controller.js)

## Testing done

- there are no errors in running on dev script
- getExample controller working fine

  ```
  GET  http://localhost:8000/api/v1/example-api/example
  ```

- registerExample controller works fine

  ```
  POST  http://localhost:8000/api/v1/example-api/register
  ```
