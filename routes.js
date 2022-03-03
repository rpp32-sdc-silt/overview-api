const { getProducts, getSpecificProduct, getStyles } = require('./api.js');

exports.routes = function(app) {

  app.get('/', (req, res) => {
    res.send('GET request received');
  })

  app.get('/products', (req, res) => {
    var { page, count } = req.query;
    (async () => {
      try {
        var result = await getProducts(page, count);
        // can body parser help with formatting of result here?
        // console.log(result.rows);
        res.status(200).send(result.rows);
      } catch(err) {
        console.error(err);
        res.status(206).send([])
      }
    })()
  })

  app.get('/products/:product_id', (req, res) => {
    (async () => {
      try {
        var result = await getSpecificProduct(req.params.product_id);
        // console.log('result: ', result);
        res.status(200).send(result);
      } catch(err) {
        console.error(err);
        res.status(206).send({});
      }
    })()
  })

  app.get('/products/:product_id/styles', (req, res) => {
    (async () => {
      try {
        var result = await getStyles(req.params.product_id);
        var formatResult = {
          product_id: req.params.product_id,
          results: result.rows
        };
        // console.log(formatResult);
        res.status(200).send(formatResult);
      } catch(err) {
        console.error(err);
        res.status(206).send({});
      }
    })()
  })

}