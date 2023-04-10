
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

//const apiRouter = require('./src/router/routes');
const { logger } = require('./src/middlewares/logEvents');
const { errorHandler } = require('./src/middlewares/errorHandler')

// Add env component - use only when docker is not used
if(process.env.SERVICE_NAME === undefined)
{
    // --- --- { path: `./.env.${process.env.NODE_ENV}` }
    require('dotenv').config();
    require('dotenv').config({ path: `.env.local`, override: true });     
}

const db = require('./src/models');

// Sync database
(async () => {
    await db.sequelize.sync();
})();

const app = express();

app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors({origin: '*'}));  //TODO change after match domain for frontend

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// add custom logger
app.use(logger);
app.use(errorHandler);


// defining an endpoint to return
app.get('/', (req, res) => {
    res.send([
        {title: 'Hello, world!'}
    ]);
});

//app.get('/api', apiRouter);

// starting the server
app.listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`);
});