
//Importing modules
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
 
const app = express();
app.use(express.json());
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

//Gets all products
app.get('/api/get_products', (req, res) => {
    const sql = 'SELECT * FROM products'; // Query to get products
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