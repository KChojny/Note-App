const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const  cors = require('cors');
const { port } = require('./App/config')
const apiRouter = require('./App/routers/api');

//db
require('./App/db/mongoose');

//parser
app.use(bodyParser.json());

//cors
app.use(cors());

//routers
app.use('/api/', apiRouter);

//server
app.listen(port, function(){
    console.log('Server is listening..... http://localhost:' + port);
});