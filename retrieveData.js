const { pool } = require('./db');

async function retrieveData() {
  try {
    const res = await pool.query('SELECT * from products');
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  }
}

retrieveData()