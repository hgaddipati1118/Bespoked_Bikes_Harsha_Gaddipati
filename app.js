
//Importing modules
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
 
const app = express();
const PORT = 3000;
const sql_password = process.env.SQL_PASSWORD ;
// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: sql_password,
  database: "bespoked_bikes"       
});
 
// open the MySQL connection
connection.connect(error => {
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