const { pool } = require('./database/db.js');

async function getProducts(pageArg, countArg) {
  var page;
  var count;
  if (pageArg === undefined) {
    page = 1;
  } else {
    page = pageArg;
  }
  if (countArg === undefined) {
    count = 5;
  } else {
    count = countArg;
  }

  try {
    var result = await pool.query('SELECT * FROM product LIMIT $1 OFFSET $2', [count, (page - 1) * count]);
    return result;
  } catch (err) {
    console.error(err);
    // need better error handling?
  }
}

async function getSpecificProduct(id) {
  var productQuery = () => {
    var res = pool.query('SELECT * FROM product WHERE id=$1', [id]);
    return res;
  };

  var featuresQuery = () => {
    var res = pool.query('SELECT feature, value from features WHERE product_id=$1', [id]);
    return res;
  };

  try {
    var [ productResult, featuresResult ]= await Promise.all([productQuery(), featuresQuery()]);
    var result = productResult.rows[0];
    result.features = featuresResult.rows;
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function getStyles(productId) {
  var styleQuery = () => {
    var res = pool.query('SELECT * FROM styles WHERE productId=$1', [productId]);
    return res;
  }


  // Need to get the style ids first, then for each get the photos and skus
  // await the styleQuery, then loop through results, query for photos and skus in parallel
  // use Promise.all to aggegrate the data

  var photoQuery = () => {
    var res = pool.query('SELECT thumbnail_url, url FROM photos WHERE styleId', []);
    return res;
  }

  var skusQuery = () => {
    var res = pool.query('SELECT', []);
  }

  try {
    var [ photoResult, styleResult, skusResult ] = await Promise.all([photoQuery(), styleQuery(), skusQuery()]);
    // var result =
    return result;
  } catch(err) {
    console.error(err);
  }
}

exports.getProducts = getProducts;
exports.getSpecificProduct = getSpecificProduct;
exports.getStyles = getStyles;