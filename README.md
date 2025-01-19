# Rs_node_html_assignment

# Customer Data Query Application

This project is a simple web application built using **Node.js** and **MySQL** that allows users to search for customers based on their address. The application allows users to:

- View a form to input an address.
- Query a MySQL database to find customers associated with that address.
- Display the results in an HTML table on the webpage.

## Features

- **MySQL Integration**: The application connects to a MySQL database to store and query customer data.
- **Dynamic Search**: Users can input an address and retrieve a list of customers associated with that address.
- **HTML Table**: The results are displayed in a structured HTML table, showing customer details like ID, Name, and Address.
- **Form Handling**: A simple HTML form is used to collect the address input from the user.
- **Error Handling**: Displays appropriate error messages if the user enters an invalid address or if the database query fails.

## Tech Stack

- **Node.js**: The backend server is built using Node.js.
- **MySQL**: Used for storing customer data.
- **HTTP Module**: The server is built using Node's built-in HTTP module to handle incoming requests.
- **File System (fs)**: Used to serve the HTML page to the client.



### Prerequisites

1. **Node.js**: Ensure that Node.js is installed on your system. 
2. **MySQL**: Install MySQL and create a database to store customer data.

Create MySQL Database and Table

Run the following SQL commands in your MySQL database to create the `customersdb` database and the `Customer` table.

sql
create database
CREATE DATABASE customersdb;
USE customersdb;

create table 
CREATE TABLE Customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255)
);

Insert sample data
INSERT INTO Customer (name, address) VALUES
('TCS', 'Bengaluru'),
('Xerox', 'Pune'),
('Principal', 'Noida'),
('Infosys', 'Mysore'),
('Makemytrip', 'Mumbai');

Show customers data
SELECT * FROM Customer;
