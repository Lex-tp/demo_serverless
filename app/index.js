const Express =  require('express');
const router = require('./router');
const bodyParser = require('body-parser');

const app = Express();

app.use(bodyParser.json({strict: false}));
app.use('/api', router);


module.exports = app;