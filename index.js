const { app } = require('./app.js');
const port = 8080;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})