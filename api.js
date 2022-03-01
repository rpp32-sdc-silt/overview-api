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
    return err;
    // need better error handling?
  }
}

async function getSpecificProduct(id) {
  var productQuery = () => {
    var res = pool.query('SELECT * FROM product WHERE id=$1', [id]);
    return res;
  };

  var featuresQuery = () => {
    var res = pool.query('SELECT feature, value FROM features WHERE product_id=$1', [id]);
    return res;
  };

  // var a = Date.now();
  try {
    var [ productResult, featuresResult ]= await Promise.all([productQuery(), featuresQuery()]);
    // var b = Date.now();
    // console.log('b-a', b-a);
    var result = productResult.rows[0];
    result.features = featuresResult.rows;
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function getStyles(productId) {
  try {
    var result = await pool.query(
      `SELECT id AS style_id, name, original_price, sale_price, default_style AS "default?", photoResult.photos AS photos, skusResult.skus AS skus from styles
      LEFT JOIN
      (SELECT styleId, json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) AS photos
        FROM photos
        WHERE styleId IN (SELECT id AS styleId FROM styles WHERE productId=$1)
        GROUP BY styleId) AS photoResult
      ON styles.id=photoResult.styleId
      LEFT JOIN
      (SELECT styleId, json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) AS skus
        FROM skus
        WHERE styleId IN (SELECT id AS styleId FROM styles WHERE productId=$1)
        GROUP BY styleId) AS skusResult
      ON styles.id=skusResult.styleId
      WHERE productId=$1`, [productId]);

    return result;
  } catch(err) {
    console.error(err);
    return err;
  }
}

exports.getProducts = getProducts;
exports.getSpecificProduct = getSpecificProduct;
exports.getStyles = getStyles;