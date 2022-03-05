const express = require('express');
const app = express();
const { routes } = require('./routes.js');
// require('newrelic');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, POST, GET, PUT, authorization"
  );
  next();
})

routes(app);

exports.app = app;

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// })