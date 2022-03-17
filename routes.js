const { getProducts, getSpecificProduct, getStyles } = require('./api.js');
const Redis = require('redis');
// const redisClient = Redis.createClient({legacyMode: true});
const redisClient = Redis.createClient({legacyMode: true, url: `redis://:${process.env.REDIS_PASS}@172.31.15.81:6379`});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
(async () => {
  await redisClient.connect();
})()

exports.routes = function(app) {


  app.get('/', (req, res) => {
    res.send('GET request received');
  })

  app.get('/products', (req, res) => {
    var { page, count } = req.query;
    (async () => {
      try {
        redisClient.get('products', async (err, data) => {
          if (err) console.error(err);
          if (data !== null) {
            res.status(200).send(JSON.parse(data));
          } else {
            var result = await getProducts(page, count);
            // can body parser help with formatting of result here?
            // console.log(result.rows);
            redisClient.set('products', JSON.stringify(result.rows));
            res.status(200).send(result.rows);
          }
        })
      } catch(err) {
        console.error(err);
        res.status(206).send([])
      }
    })()
  })

  app.get('/products/:product_id', (req, res) => {
    var productId = req.params.product_id;
    (async () => {
      try {
        redisClient.get(`${productId}`, async (err, data) => {
          if (err) console.error(err);
          if (data !== null) {
            res.status(200).send(JSON.parse(data));
          } else {
            var result = await getSpecificProduct(productId);
            // console.log('result: ', result);
            redisClient.set(`${productId}`, JSON.stringify(result))
            res.status(200).send(result);
          }
        })
      } catch(err) {
        console.error(err);
        res.status(206).send({});
      }
    })()
  })

  app.get('/products/:product_id/styles', (req, res) => {
    var productId = req.params.product_id;
    (async () => {
      try {
        redisClient.get(`${productId}-styles`, async (err, data) => {
          if (err) console.error(err);
          if (data !== null) {
            res.status(200).send(JSON.parse(data));
          } else {
            var result = await getStyles(productId);
            var formatResult = {
              product_id: req.params.product_id,
              results: result.rows
            };
            // console.log(formatResult);
            redisClient.set(`${productId}-styles`, JSON.stringify(formatResult))
            res.status(200).send(formatResult);
          }
        })
      } catch(err) {
        console.error(err);
        res.status(206).send({});
      }
    })()
  })

}