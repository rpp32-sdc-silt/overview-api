const express = require('express');
const app = express();
const port = 3000;
const { routes } = require('./routes.js');

routes(app);

exports.app = app;

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// })