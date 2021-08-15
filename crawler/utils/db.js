const mysql = require("mysql");
require("dotenv").config();
const Promise = require("bluebird");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


//蓋掉內建的Promise
//promisifyAll 全部東西Promise化
connection = Promise.promisifyAll(connection);

//會回傳Promise
// connection.connectAsync()
// connection.queryAsync()

// connection = (connection);
module.exports = connection;

//  module.exports = connection;使用方式
//   const connection = require()
//   connection.query

// module.exports.connection = connection;使用方式
// 1.const db = require();
//   db.connection.query
// 2.const {connection} = require();取部分屬性
//   connection.query