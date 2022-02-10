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

exports.getProducts = getProducts;