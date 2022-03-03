const { Pool } = require('pg');

const pool = new Pool({
  user: 'sdc',
  password: 'sdc',
  database: 'sdc',
  port: 5432,
  host: 'localhost',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = { pool };