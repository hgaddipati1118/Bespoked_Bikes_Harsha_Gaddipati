
//Importing modules
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
 
const app = express();
app.use(express.json());

const cors = require('cors'); // Import the cors package
app.use(
    cors({
      origin: 'http://localhost:3001', // Allow requests from this origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    })
);

const PORT = 3000;
const sql_password = process.env.SQL_PASSWORD ;
// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: sql_password,
  database: "bespoked_bikes"       
});
 
// open the MySQL connection
db.connect(error => {
    if (error){
        console.log("A error has been occurred "
            + "while connecting to database.");        
        throw error;
    }
     
    //If Everything goes correct, Then start Express Server
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready and "
             + "Server is Listening on Port ", PORT);
    })
});

//Gets all salespeople
app.get('/api/get_salespeople', (req, res) => {
    const sql = 'SELECT * FROM salesperson'; // Query to get salespeople
    db.query(sql, (err, results) => {
      if (err) {
        //Lets me know what went wrong
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
  
      res.json(results);
    });
  });

//Gets all salespeople_ids
app.get('/api/get_salespeople_id', (req, res) => {
    const sql = 'SELECT sp_id FROM salesperson'; // Query to get salespeople
    db.query(sql, (err, results) => {
      if (err) {
        //Lets me know what went wrong
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
  
      res.json(results);
    });
  });

//Gets all products
app.get('/api/get_products', (req, res) => {
    const sql = 'SELECT * FROM product'; // Query to get products
    db.query(sql, (err, results) => {
      if (err) {
        //Lets me know what went wrong
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
  
      res.json(results);
    });
  });

//Gets all products ods
app.get('/api/get_products_ids', (req, res) => {
    const sql = 'SELECT product_id FROM product'; // Query to get products
    db.query(sql, (err, results) => {
      if (err) {
        //Lets me know what went wrong
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
  
      res.json(results);
    });
  });

//Gets all customer ids
app.get('/api/get_customer_ids', (req, res) => {
    const sql = 'SELECT c_id FROM customer'; // Query to get products
    db.query(sql, (err, results) => {
      if (err) {
        //Lets me know what went wrong
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
  
      res.json(results);
    });
  });
//Gets all customers
app.get('/api/get_customers', (req, res) => {
    const sql = 'SELECT * FROM customer'; // Query to get customers
    db.query(sql, (err, results) => {
      if (err) {
        //Lets me know what went wrong
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
  
      res.json(results);
    });
  });

//Gets all sales
app.get('/api/get_sales', (req, res) => {
    const sql = 'SELECT * FROM sales'; // Query to get customers
    db.query(sql, (err, results) => {
      if (err) {
        //Lets me know what went wrong
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
  
      res.json(results);
    });
  });

// POST to get current "real" price of product at date
app.post('/api/get_product_price', (req, res) => {
    const product_id = req.body.product_id;
    const sale_date = req.body.sale_date;
    console.log(product_id, sale_date);
    const sql_1 = `SELECT d_pct FROM discount WHERE product_id = ? AND 
    start_date <= ? AND end_date >= ?`; // Query to get discounts valid at time
    const sql_2 = `SELECT sale_price from product WHERE product_id = ?`
    db.query(sql_1, [product_id, sale_date, sale_date], (err, results) => {
      if (err) {
        //Lets me know what went wrong
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
      let discount = 1.0; //No discount intially
      for(let i = 0; i < results.length; i++){
        discount *= (100 - results[i].d_pct)/100 //For each discount adjust multiplier
      }
      db.query(sql_2, [product_id, sale_date, sale_date], (err, results) => {
        if (err) {
          //Lets me know what went wrong
          console.error('Error executing SQL query:', err);
          res.status(500).json({ error: 'An error occurred' });
          return;
        }
        results[0].sale_price *= discount; //Change price by discount
        res.json(results);
      });
    });
  });

// POST to get specific salesperson
app.post('/api/get_salesperson', (req, res) => {
    const receivedData = req.body; // Extract data from the request body
    console.log(receivedData);
    const sp_id = req.body.sp_id;
    const query = 'SELECT * from salesperson WHERE sp_id = ?';
    db.query(query, [sp_id], (error, results) => {
    if (error) {
        console.error('Error getting record:', error);
        res.status(500).json({ error: 'An error occurred' });
    } else {
        console.log('Record fetched');
        res.json(results);
    }
    });
  });

// POST to get specific product
app.post('/api/get_product', (req, res) => {
    const receivedData = req.body; // Extract data from the request body
    console.log(receivedData);
    const product_id = req.body.product_id;
    const query = 'SELECT * from product WHERE product_id = ?';
    db.query(query, [product_id], (error, results) => {
    if (error) {
        console.error('Error getting record:', error);
        res.status(500).json({ error: 'An error occurred' });
    } else {
        console.log('Record fetched');
        res.json(results);
    }
    });
  });

// POST to update salesperson record
app.post('/api/update_salesperson', (req, res) => {
    const receivedData = req.body; // Extract data from the request body
    console.log(receivedData);
    const sp_id = req.body.sp_id;
    const query = 'UPDATE salesperson SET ? WHERE sp_id = ?';
    let updatedData = {};
    //All the potential columns that could be updated
    salesperson_cols = ["first_name", "last_name", "street_address", "city", "state_code", "zip_code", 
    "phone_num", "start_date", "termination_date", "manager"];
    
    //Sets keys of updatedData to all values passed in
    for(let i = 0; i < salesperson_cols.length; i++){
        if(req.body[salesperson_cols[i]] != undefined){
            updatedData[salesperson_cols[i]] = req.body[salesperson_cols[i]];
        }
    }
    db.query(query, [updatedData, sp_id], (error, results) => {
    if (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ error: 'An error occurred' });
    } else {
        console.log('Record updated successfully.');
        res.json({result: "updated successfully!"});
    }
    });
  });

// POST to update salesperson record
app.post('/api/update_salesperson', (req, res) => {
    const receivedData = req.body; // Extract data from the request body
    console.log(receivedData);
    const sp_id = req.body.sp_id;
    const query = 'UPDATE salesperson SET ? WHERE sp_id = ?';
    let updatedData = {};
    //All the potential columns that could be updated
    salesperson_cols = ["first_name", "last_name", "street_address", "city", "state_code", "zip_code", 
    "phone_num", "start_date", "termination_date", "manager"];
    
    //Sets keys of updatedData to all values passed in
    for(let i = 0; i < salesperson_cols.length; i++){
        if(req.body[salesperson_cols[i]] != undefined){
            updatedData[salesperson_cols[i]] = req.body[salesperson_cols[i]];
        }
    }
    db.query(query, [updatedData, sp_id], (error, results) => {
    if (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ error: 'An error occurred' });
    } else {
        console.log('Record updated successfully.');
        res.json({result: "updated successfully!"});
    }
    });
  });

  // POST to update product record
app.post('/api/update_product', (req, res) => {
    const receivedData = req.body; // Extract data from the request body
    console.log(receivedData);
    const sp_id = req.body.product_id;
    const query = 'UPDATE product SET ? WHERE product_id = ?';
    let updatedData = {};
    //All the potential columns that could be updated
    product_cols = ["name", "manufacturer", "style", "purchase_price", "sale_price", "qty_on_hand", "comm_pct"];

    //Sets keys of updatedData to all values passed in
    for(let i = 0; i < product_cols.length; i++){
        if(req.body[product_cols[i]] != undefined){
            updatedData[product_cols[i]] = req.body[product_cols[i]];
        }
    }
    db.query(query, [updatedData, sp_id], (error, results) => {
    if (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ error: 'An error occurred' });
    } else {
        console.log('Record updated successfully.');
        res.json({result: "updated successfully!"});
    }
    });
  });

  //POST to insert sale
  app.post('/api/create_sale', (req, res) => {
    const receivedData = req.body; // Extract data from the request body
    const query = 'INSERT INTO sales SET ?';
    db.query(query, [receivedData], (error, results) => {
    if (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ error: 'An error occurred' });
    } else {
        console.log('Record created successfully.');
        res.json({result: "Created successfully!"});
    }
    });
  });

  //POST to get_commisions for quarter
  app.post('/api/get_comm', (req, res) => {
    const receivedData = req.body; // Extract data from the request body
    console.log(receivedData);
    const start_day = req.body.start_day;
    const end_day = req.body.end_day;
    const query = `select salesperson.sp_id, first_name, last_name, comm
    from salesperson LEFT JOIN (select sum(product_price * comm_pct) as comm, sp_id as salesp_id  
    from sales where sale_date > ? AND
    sale_date < ? group by sp_id) as T 
    on salesperson.sp_id = salesp_id;`;
    db.query(query, [start_day, end_day], (error, results) => {
    if (error) {
        console.error('Error getting record:', error);
        res.status(500).json({ error: 'An error occurred' });
    } else {
        console.log('Record fetched');
        res.json(results);
    }
    });
  });