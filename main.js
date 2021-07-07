var http = require("http");
var express = require('express');
var fs = require("fs");
// var data = fs.readFileSync('input.txt');

http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(8081);

// console.log(data.toString());
buf = new Buffer.alloc(256);
len = buf.write("Simply Easy Learning");

console.log("Octets written : "+  len);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

// console.log("Hello, World!", fs);