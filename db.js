const { Pool } = require('pg');

const pool = new Pool({
  user: 'sdc',
  password: 'sdc',
  database: 'sdc',
  port: 5432,
  host: 'localhost'
});

module.exports = { pool };