const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

//const apiRouter = require('./src/router/routes');
const { logger } = require("./src/middlewares/logEvents");
const { errorHandler } = require("./src/middlewares/errorHandler");

if(process.env.DB_NAME === undefined)
{
  dotenv.config();
  // allow to use .env instead of .env.local
  dotenv.config({ path: ".env.local", override: true });
}

const notesApi = require('./src/routes/noteroutes');
const tasksApi = require('./src/routes/taskroutes');
const usersApi = require('./src/routes/userroutes');
const tokenApi = require('./src/routes/authrouter');
const securityApi = require('./src/routes/securityrouter');

const db = require("./src/models");

// Sync database
(async () => {
  await db.sequelize.sync();
})();

const app = express();

app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors({ origin: "*" })); //TODO change after match domain for frontend

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// add custom logger
app.use(logger);
app.use(errorHandler);

// defining an endpoint to return
app.get("/", (req, res) => {
  res.send([{ title: "Hello, world!" }]);
});

app.use('/api/users', usersApi);
app.use('/api/tasks', tasksApi);
app.use('/api/notes', notesApi);
app.use('/api/token', tokenApi);
app.use('/api', securityApi);

// starting the server
app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});
