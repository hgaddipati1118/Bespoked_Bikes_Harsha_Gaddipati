
//Importing modules
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
 
const app = express();
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