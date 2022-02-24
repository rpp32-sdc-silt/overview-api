const { getProducts, getSpecificProduct, getStyles } = require('./api.js');

exports.routes = function(app) {

  app.get('/', (req, res) => {
    res.send('GET request received');
  })

  app.get('/products', (req, res) => {
    var { page, count } = req.query;
    (async () => {
      var result = await getProducts(page, count);
      // can body parser help with formatting of result here?
      // console.log(result.rows);
      res.status(200).send(result.rows);
    })()
  })

  app.get('/products/:product_id', (req, res) => {
    (async () => {
      var result = await getSpecificProduct(req.params.product_id);
      // console.log('result: ', result);
      res.status(200).send(result);
    })()
  })

  app.get('/products/:product_id/styles', (req, res) => {
    (async () => {
      var result = await getStyles(req.params.product_id);
      var formatResult = {
        product_id: req.params.product_id,
        results: result.rows
      };
      // console.log(formatResult);
      res.status(200).send(formatResult);
    })()
  })

}