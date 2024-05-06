import express from 'express';
import cors from 'cors';
import { sql, config } from './sqlconfig.cjs';

const app = express();
app.use(cors());

// get all products

app.get('/product', (req, res) => {
  sql.connect(config)
    .then(pool => {
      return pool.request().query('SELECT * FROM Products');
    })
    .then(result => {
      res.json(result.recordset);
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// get product with specific id

app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  sql.connect(config)
    .then(pool => {
      return pool.request()
        .input('id', sql.Int, productId)
        .query('SELECT * FROM Products WHERE productID = @id');
    })
    .then(result => {
      if (result.recordset.length > 0) {
        res.json(result.recordset[0]); 
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/category', (req, res) => {
  sql.connect(config)
    .then(pool => {
      return pool.request().query('SELECT CategoryID, CategoryName, Description FROM Categories');
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
  console.log(`Server is running on port: ${PORT}`);
});

