const { pool } = require('./db.js');
const fs = require('fs');
const csvParser = require('csv-parser');

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

async function insertData(row) {
  // var [name, slogan, description, category, default_price] = row;
  var { name, slogan, description, category, default_price } = row;
  // console.log(default_price, typeof default_price);
  // default_price = parseInt(default_price);
  try {
    var res = await pool.query(
      'INSERT INTO product (name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5)',
      [name, slogan, description, category, default_price]
    );
    console.log(`Inserted ${name} successfully`);
  } catch (err) {
    console.error(err);
  }
}

var filePath = '/mnt/c/Users/mende/OneDrive/Documents/Coding/Hack_Reactor_Bootcamp/SDC/product.csv';
fs.createReadStream(filePath)
  .on('error', (err) => {
    console.error('createReadStream error: ', err);
  })
  .pipe(csvParser())
  .on('data', (row) => {
    insertData(row);
  })
  .on('end', () => {
    console.log('Complete');
  })
  // .on('data', (chunk) => {
  //   var row = chunk.toString().split(',').map((item) => {
  //     return item.trim();
  //   })
  //   insertData(row);
  //   // console.log(chunk.toString());
  // })