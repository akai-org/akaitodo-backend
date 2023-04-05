
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

//const apiRouter = require('./src/router/routes');
const { logger } = require('./src/middlewares/logEvents');
const { errorHandler } = require('./src/middlewares/errorHandler')

// Add env component
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

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