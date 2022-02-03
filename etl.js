const { pool } = require('./db.js');
const fs = require('fs');
const path = require('path');

// async function insertData() {
//   const [name, slogan, description, category, default_price] = ['onsie', 'one piece', 'cozy', 'night-wear', 50];
//   try {
//     const res = await pool.query(
//       'INSERT INTO products (name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5)',
//       [name, slogan, description, category, default_price]
//     );
//     console.log(`Inserted ${name} successfully`);
//   } catch (err) {
//     console.error(err);
//   }
// }

// insertData();

fs.createReadStream('/mnt/c/Users/mende/OneDrive/Documents/Coding/Hack_Reactor_Bootcamp/SDC/product.csv')