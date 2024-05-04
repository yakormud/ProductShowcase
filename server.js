import express from 'express';
import { sql, config } from './sqlconfig.cjs';

const app = express();

// Define your routes or SQL connection logic here
app.get('/', (req, res) => {
  // Example SQL query
  sql.connect(config)
    .then(pool => {
      return pool.request().query('SELECT * FROM Products WHERE ProductID = 77');
    })
    .then(result => {
      res.json(result.recordset);
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Start the server
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

