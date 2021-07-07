var http = require("http");
const express = require('express');
const bodyparser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;

var app = express();
var fs = require("fs");

const uri = "mongodb+srv://nexusroot:system@123@cluster0.x09ld.mongodb.net/obaidbaluch07?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const db = client.db("obaidbaluch07");
  // perform actions on the collection object

  	app.use(bodyparser.json());

  	app.post('/insert_employee', async (req, res) => {
  		await db.createCollection("People")
		await db.collection("People").insert(req.body);
	  	res.send(req.body)
	})

	app.get('/get_employees', async (req, res) => {
		let result = await db.collection("Employees").find().toArray();
		console.log(result)
	  	res.send(result)
	})

  // client.close();
});



// Your Port is here
app.listen(3000, ()=>console.log("Server running at http://127.0.0.1:3000/"));