const sql = require("mssql");

const config = {
  server: 'LAPTOP-E4MO904H\SQLEXPRESS',
  database: 'Northwind',
  user: 'sa',
  password: '123456789',
  encrypt: false,
  trustServerCertificate: false,
};

module.exports = {
  sql: sql,
  config: config
};
