import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import sql from "mssql";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    console.error('Error connecting to the database:', error.message);
  } finally {
    await sql.close();
  }
}
testConnection();

// async function createTestUser(){
//   try {
//     await sql.connect(config).then(pool =>{
//       return pool.request().query('INSERT INTO user (UserName,UserPassword,FirstName,LastName,PathToPicture) Values (admin1,abc12345,Narinphat,Limpavittayapon,)');
//     })
//   } catch (error) {
//     console.error('Error connecting to the database:', error.message);
//   } finally {
//     await sql.close();
//   }
// }

//get auth
app.post('/auth',(req,res) =>{
  
  const user = req.body;
  sql.connect(config)
    .then(pool => {
      return pool.request()
      .input('userName', sql.NVarChar, user.username)
      .query('SELECT * FROM "user" WHERE UserName = @userName');
    })
    .then(result => {
      if (result.recordset.length > 0) {
        var queryUser = result.recordset[0];
        if(user.password === queryUser.UserPassword){
          const jwtToken = jwt.sign(
            { id: queryUser.UserID, 
              username: queryUser.UserName,
              firstname: queryUser.FirstName,
              lastname: queryUser.LastName,
            },"mySecretKey");
            res.header(jwtToken);
        }else{
          res.status(404).json({ error: 'Login Error!' });
        }
      } else {
        res.status(404).json({ error: 'Login Error!' });
      }
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
})


// get all products

app.get('/product', (req, res) => {
  sql.connect(config)
    .then(pool => {
      return pool.request().query('SELECT * FROM product');
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
        .query('SELECT * FROM product WHERE productID = @id');
    })
    .then(result => {
      if (result.recordset.length > 0) {
        const jwtToken = jwt
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
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    const fileName = `${timestamp}_${random}.png`; // Append ".png"
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

app.post('/uploadproducts', upload.single('picture'), async (req, res) => {

  const { productName, productCategory, price, description, stock } = req.body;

  const picturePath = req.file ? req.file.path : null;

  console.log('Received form data:', { productName, productCategory, price, stock, description });
  console.log('Received picture:', picturePath);


  try {
    // Connect to the database
    const pool = await sql.connect(config);

    // Insert data using parameterized query
    const result = await pool.request()
      .input('productName', sql.NVarChar, productName)
      .input('productCategory', sql.Int, productCategory)
      .input('description', sql.NVarChar, description)
      .input('stock', sql.Int, stock)
      .input('price', sql.Money, price)
      .input('picturePath', sql.NVarChar, picturePath)
      .query(`
        INSERT INTO product (ProductName, CategoryID, ProductDetail, ProductStock, ProductPrice, PathToPhoto)
        VALUES (@productName, @productCategory, @description, @stock, @price, @picturePath)
      `);

    console.log('Rows affected:', result.rowsAffected);

    // Close the connection
    await pool.close();

    res.send('Form data received and inserted into the database successfully!');
  } catch (error) {
    console.error('Error inserting data into the database:', error.message);
    res.status(500).send('Internal server error. Failed to insert data into the database.');
  }
});

// PICTURE
app.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, './uploads/', filename);

  fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
      if (err) {
          const filePath = path.join(__dirname, './uploads/default.png');
          fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
              const base64Data = `data:image/jpeg;base64,${data}`;
              res.send(base64Data);
          });
      } else {
          //res.send(data);
          const base64Data = `data:image/jpeg;base64,${data}`;
          res.send(base64Data);
      }
  });
});

// Start the server
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

