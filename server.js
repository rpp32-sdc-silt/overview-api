const express = require('express');
const app = express();
const port = 3000;
const { getProducts, getSpecificProduct, getStyles } = require('./api.js');

app.get('/', (req, res) => {
  res.send('GET request received');
})

app.get('/products', (req, res) => {
  var { page, count } = req.query;
  (async () => {
    var result = await getProducts(page, count);
    // can body parser help with formatting of result here?
    res.status(200).send('GET Products result: ' + JSON.stringify(result.rows));
  })()
})

app.get('/products/:product_id', (req, res) => {
  (async () => {
    var result = await getSpecificProduct(req.params.product_id);
    console.log('result: ', result);
    res.status(200).send('GET productid result: ' + JSON.stringify(result));
  })()
})

app.get('/products/:product_id/styles', (req, res) => {
  (async () => {
    var result = await getStyles(req.params.product_id);
    res.status(200).send('GET styles result: ' + result);
  })()
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})