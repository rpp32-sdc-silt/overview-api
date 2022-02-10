const express = require('express');
const app = express();
const port = 3000;
const { getProducts } = require('./api.js');

app.get('/', (req, res) => {
  res.send('GET request received');
})

app.get('/products', (req, res) => {
  var { page, count } = req.query;
  (async () => {
    var result = await getProducts(page, count);
    res.status(200).send('GET Products result: ' + JSON.stringify(result.rows));
  })()
})

app.get('/products/:product_id', (req, res) => {
  res.send('GET productid request received');
})

app.get('/products/:product_id/styles', (req, res) => {
  res.send('GET styles request received');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})