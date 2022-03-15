const express = require('express');
const app = express();
const { routes } = require('./routes.js');
// require('newrelic');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, POST, GET, PUT, authorization"
  );
  next();
})

app.use(express.static('public'));

routes(app);

exports.app = app;