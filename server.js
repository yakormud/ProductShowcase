import express from 'express';
import cors from 'cors';
// import { sql, config } from './sqlconfig.cjs';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import sql from "mssql";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const config = {
  server: 'productdb.czw620y8qg76.us-east-1.rds.amazonaws.com',
  database: 'Product',
  user: 'adminlogin',
  password: '123456789',
  encrypt: false,
  trustServerCertificate: false,
};

async function testConnection() {
  try {
    await sql.connect(config);
    console.log('Connected to the database successfully!');
  } catch (error) {
    // Log any errors that occur during connection attempt
    console.error('Error connecting to the database:', error.message);
  } finally {
    // Close the connection pool to free up resources
    await sql.close();
  }
}
testConnection();

// get all products

app.get('/product', (req, res) => {
  sql.connect(config)
    .then(pool => {
      return pool.request().query('SELECT * FROM products');
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
      return pool.request().query('SELECT CategoryID, CategoryName FROM category');
    })
    .then(result => {
      res.json(result.recordset);
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


// image uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const fileName = `${req.body.productId}_${currentDate}`;
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

app.post('/uploadproducts', upload.single('picture'), (req, res) => {

  const { productName, productCategory, price, description } = req.body;

  const picturePath = req.file ? req.file.path : null;

  console.log('Received form data:', { productName, productCategory, price, description });
  console.log('Received picture:', picturePath);

  res.send('Form data received successfully!');
});

// Start the server
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

