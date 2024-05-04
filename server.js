import { sql, config } from "./sqlconfig.cjs";

sql.connect(config)
  .then(pool => {
    return pool.request().query('SELECT * FROM Products WHERE ProductID = 77');
  })
  .then(result => {
    console.log('ProductID:', result.recordset[0].ProductID);
    console.log('ProductName:', result.recordset[0].ProductName);
    console.log('SupplierID:', result.recordset[0].SupplierID);
    console.log('CategoryID:', result.recordset[0].CategoryID);
    console.log('QuantityPerUnit:', result.recordset[0].QuantityPerUnit);
    console.log('UnitPrice:', result.recordset[0].UnitPrice);
    console.log('UnitsInStock:', result.recordset[0].UnitsInStock);
    console.log('UnitsOnOrder:', result.recordset[0].UnitsOnOrder);
    console.log('ReorderLevel:', result.recordset[0].ReorderLevel);
    console.log('Discontinued:', result.recordset[0].Discontinued);
    console.log('output:', result.output);
    console.log('rowsAffected:', result.rowsAffected);
  })
  .catch(err => {
    console.error('Error:', err);
  });
