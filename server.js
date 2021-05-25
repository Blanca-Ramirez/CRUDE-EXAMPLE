const bodyparser = require('body-parser');
const express = require('express');

const countryroute = require('./router/country.router')();

let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use('/v1/country', countryroute);

module.exports = app;