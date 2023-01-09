const mysql = require('mysql2/promise');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

let pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      connectionLimit: 10,
      timezone: 'Z',
    });
  }
  return await pool.getConnection();
};

module.exports = { getConnection };
