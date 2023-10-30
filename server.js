const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cron = require("node-cron");

//const apiRouter = require('./src/router/routes');
const { logger } = require("./src/middlewares/logEvents");
const { errorHandler } = require("./src/middlewares/errorHandler");

const { tokenCheck } = require("./src/middlewares/tokenCheck");

if(process.env.DB_NAME === undefined)
{
  dotenv.config({ path: ".env"});
  // allow to use .env instead of .env.local
  dotenv.config({ path: ".env.local", override: true });
}
const secret = require("./src/middlewares/secret.js");

const notesApi = require('./src/routes/noteroutes');
const tasksApi = require('./src/routes/taskroutes');
const usersApi = require('./src/routes/userroutes');
const securityApi = require('./src/routes/securityrouter');

const db = require("./src/models");

// Sync database
(async () => {
  await db.sequelize.sync({ force: true });
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
app.use(tokenCheck);

// defining an endpoint to return
app.get("/", (req, res) => {
  res.send([{ title: "Hello world!"}]);
});
app.get("/access", (req, res) => {
  res.send([{ title: "Hi, you have access with your token!"}]);
});

app.use('/api/users', usersApi);
app.use('/api/tasks', tasksApi);
app.use('/api/notes', notesApi);
app.use('/api', securityApi);

//Generating first secret key
secret.regenerateSecret();
// starting the server
app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});
console.log(`Token expiration time:${process.env.TOKEN_EXPIRATION_TIME}`);
console.log(`Token refresh time:${process.env.TOKEN_REFERESH_TIME}`);

//JWT Secret key regegeneration 
// "0 3 * * 1" => “At 03:00 on Monday.”
cron.schedule("0 3 * * 1", function () {
  secret.regenerateSecret();
  setTimeout(secret.setSecretKeyPreviousToNull,(process.env.TOKEN_EXPIRATION_TIME|0))*1000;
});
