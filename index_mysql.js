var http = require("http");
const express = require('express');
const mysql = require("mysql");
var app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
var fs = require("fs");


var mysqlConnection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "obaidali",
	multipleStatements: true,
});

mysqlConnection.connect((err)=>{
	if(!err)
		console.log("Database connection succeeded...");
	else
		console.log("DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2));
});


// Get Default Route
app.get("/", (req,res)=>{
	res.redirect('/employees');
});

// Get All Employee Records
app.get("/employees", (req,res)=>{
	mysqlConnection.query("select * from employee", (err, rows, fielfs)=>{
		if(!err)
			res.send(rows);
		else
			console.log("DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2));
	});
});

// Get Single Employee Record
// Params: id
app.get("/employees/:id", (req,res)=>{
	mysqlConnection.query("select * from employee where EmpID = ?",[req.params.id], (err, rows, fielfs)=>{
		if(!err)
			res.send(rows);
		else
			console.log("DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2));
	});
});

// Employee Delete Record
// Params: id
app.delete("/employees/:id", (req,res)=>{
	mysqlConnection.query("delete from employee where EmpID = ?",[req.params.id], (err, rows, fielfs)=>{
		if(!err)
			res.send("Deleted Successfully");
		else
			console.log("DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2));
	});
});


// Employee Insert Record
app.post("/employees", (req,res)=>{
	let emp = req.body;
	var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
	call EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary);";
	mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fielfs)=>{
		if(!err)
			rows.forEach(element => {
				if (element.constructor == Array)
					res.send("Inserted Employee ID : " + element[0].EmpID);
			});
		else
			console.log("DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2));
	});
});


// Employee Update Record
app.put("/employees", (req,res)=>{
	let emp = req.body;
	var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
	call EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary);";
	if(emp.EmpID != 0){
		mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fielfs)=>{
			if(!err)
				rows.forEach(element => {
					if (element.constructor == Array)
						res.send("Updated Successfully");
				});
			else
				console.log("DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2));
		});
	}else{
		res.send("Employee ID Cannot Be 0");
	}
});

// Your Port is here
app.listen(3000, ()=>console.log("Server running at http://127.0.0.1:3000/"));