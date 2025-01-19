const mysql2 = require ('mysql2');
const http = require('http');
const fs = require('fs');
const mysql = require('mysql');


var con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "ptspl123",
  database: "customersdb"
});

con.connect(function(err, result){
    if (err) throw err;
    console.log("mysql connect successfully");
    // con.query(" CREATE DATABASE customersdb", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log("Database create succesfully ");
    // });
    
    // con.query(" CREATE Table Customer (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log("table create succesfully ");

    // });

    // con.query("INSERT INTO Customer (name, address) VALUES ('TCS', 'Bengaluru')", function(err, result, fields){
    //     if(err) throw err;
    //     console.log("data insert successfully");
    // })
    // var sql = "INSERT INTO Customer (name, address) VALUES ?";
    // var values = [
    //   ['Xerox', 'Pune'],
    //   ['Principal', 'Noida'],
    //   ['Infosys', 'Mysore'],
    //   ['Makemytrip', 'Mumbai']
      
    // ];
    // con.query(sql, [values], function (err, result) {
    //   if (err) throw err;
    //   console.log("Number of records inserted: " + result.affectedRows);
    // });

});
http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // If no address query, show the input form
  if (pathname === '/' || pathname === '/index.html') {
    fs.readFile('./index.html', (err, data) => {
      if (err) return handleError(res, 500, "Internal Server Error");
      sendResponse(res, 200, 'text/html', data);
    });
  }
  // Handle the query when the address is provided
  else if (pathname === '/getCustomers') {
    const address = parsedUrl.query.address;
    if (address) {
      const sql = "SELECT * FROM Customer WHERE address = ?";
      con.query(sql, [address], (err, results) => {
        if (err) return handleError(res, 500, "Database Query Failed");

        const html = generateTableHTML(results);
        sendResponse(res, 200, 'text/html', html);
      });
    } else {
      handleError(res, 400, "Address parameter is missing");
    }
  } else {
    handleError(res, 404, "Not Found");
  }
}).listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});

// Helper function for error handling
function handleError(res, code, message) {
  res.writeHead(code, { 'Content-Type': 'text/html' });
  res.end(`<h1>${message}</h1>`);
}

// Helper function to send the response
function sendResponse(res, code, contentType, data) {
  res.writeHead(code, { 'Content-Type': contentType });
  res.end(data);
}

// Function to generate the HTML table from query results
function generateTableHTML(rows) {
  const rowsHTML = rows.map(row => `
    <tr>
      <td>${row.id}</td>
      <td>${row.name}</td>
      <td>${row.address}</td>
    </tr>`).join('');

  return `
    <html>
      <head><title>Customer Data</title></head>
      <body>
        <h1>Customer Data</h1>
        <table border="1" style="width:50%; text-align:left;">
          <tr><th>ID</th><th>Name</th><th>Address</th></tr>
          ${rowsHTML}
        </table>
        <br><a href="/">Back to Search</a>
      </body>
    </html>`;
}