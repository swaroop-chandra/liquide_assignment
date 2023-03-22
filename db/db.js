const mysql = require("mysql2");

const readPool = mysql.createPool({
  connectionLimit: 4,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = {
  readPool,
};
