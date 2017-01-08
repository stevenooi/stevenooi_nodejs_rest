var express = require('express'); 
var fs = require('fs');
var http = require("http");
var app = express(); 


app.use('/calSalary', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization");
  next();
});

app.get('/calSalary', function (request, response) {  
	response.header("Access-Control-Allow-Origin", "*");
  // Data retrieved from client
	var firstName = request.query.firstName;
	var lastName = request.query.lastName;
	var income = request.query.income;
	var superAnnuation = request.query.superAnnuation;

	// Start Processing
	var t= new Date();
	var endOfMonth = (new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59));
	var payDate = endOfMonth.getDate() + " " + month[endOfMonth.getMonth()] + " " + endOfMonth.getFullYear();
	var grossIncome = Math.round(income / 12);
	var incomeTax = Math.round(calIncomeTax(income));
	var netIncome = grossIncome - incomeTax;
	var superAnnuationNum = Math.round(grossIncome * superAnnuation / 100);
	var pay = netIncome - superAnnuationNum;
	// End Processing

	// To bypass cross origin checking
	//response.header('Access-Control-Allow-Origin', 'http://localhost:8080');
	  
   
   var returnStr = '';
   returnStr += '"firstName":"' + firstName + '"';
   returnStr += ',"lastName":"' + lastName + '"';
   returnStr += ',"payDate":"' + payDate + '"';
   returnStr += ',"payFrequency":"Monthly"';
   returnStr += ',"annualIncome":"$ ' + parseFloat(income).toFixed(2) + '"';
   returnStr += ',"grossIncome":"$ ' + parseFloat(grossIncome).toFixed(2) + '"';
   returnStr += ',"incomeTax":"$ ' + parseFloat(incomeTax).toFixed(2) + '"';
   returnStr += ',"netIncome":"$ ' + parseFloat(netIncome).toFixed(2) + '"';
   returnStr += ',"superAnnuationNum":"$ ' + parseFloat(superAnnuationNum).toFixed(2) + '"';
   returnStr += ',"pay":"$ ' + parseFloat(pay).toFixed(2) + '"';
     
   // Validations
   if(firstName == null || firstName.length == 0)
   {
	   returnStr += ',"error":"Firstname must not be empty"';
   }
   else if(lastName == null || lastName.length == 0)
   {
	   returnStr += ',"error":"Lastname must not be empty"';
   }
   else if(income == null || income.length == 0)
   {
	   returnStr += ',"error":"Annual Salary must not be empty"';
   }
   else if(superAnnuation == null ||superAnnuation.length == 0)
   {
	   returnStr += ',"error":"Super Rate must not be empty"';
   }
   else if(validateExists(fs,returnStr))
   { 
	   returnStr += ',"error":""';
	   saveFile(fs,returnStr);
   }
   else{  
	   returnStr += ',"error":"Duplicate pay slip generation detected. Record is not saved"';
   }

   returnStr = '{' + returnStr + '}'; 
    
    response.writeHead(200, {'Content-Type': 'text/plain'}); 
	console.log(returnStr);
    response.write(returnStr);  
    response.end(); 
}); 



app.post('/calSalary', function (request, response) {  
	response.header("Access-Control-Allow-Origin", "*");
  // Data retrieved from client
	var firstName = request.query.firstName;
	var lastName = request.query.lastName;
	var income = request.query.income;
	var superAnnuation = request.query.superAnnuation;

	// Start Processing
	var t= new Date();
	var endOfMonth = (new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59));
	var payDate = endOfMonth.getDate() + " " + month[endOfMonth.getMonth()] + " " + endOfMonth.getFullYear();
	var grossIncome = Math.round(income / 12);
	var incomeTax = Math.round(calIncomeTax(income));
	var netIncome = grossIncome - incomeTax;
	var superAnnuationNum = Math.round(grossIncome * superAnnuation / 100);
	var pay = netIncome - superAnnuationNum;
	// End Processing

	// To bypass cross origin checking
	//response.header('Access-Control-Allow-Origin', 'http://localhost:8080');
	  
   
   var returnStr = '';
   returnStr += '"firstName":"' + firstName + '"';
   returnStr += ',"lastName":"' + lastName + '"';
   returnStr += ',"payDate":"' + payDate + '"';
   returnStr += ',"payFrequency":"Monthly"';
   returnStr += ',"annualIncome":"$ ' + parseFloat(income).toFixed(2) + '"';
   returnStr += ',"grossIncome":"$ ' + parseFloat(grossIncome).toFixed(2) + '"';
   returnStr += ',"incomeTax":"$ ' + parseFloat(incomeTax).toFixed(2) + '"';
   returnStr += ',"netIncome":"$ ' + parseFloat(netIncome).toFixed(2) + '"';
   returnStr += ',"superAnnuationNum":"$ ' + parseFloat(superAnnuationNum).toFixed(2) + '"';
   returnStr += ',"pay":"$ ' + parseFloat(pay).toFixed(2) + '"';
     
   // Validations
   if(firstName == null || firstName.length == 0)
   {
	   returnStr += ',"error":"Firstname must not be empty"';
   }
   else if(lastName == null || lastName.length == 0)
   {
	   returnStr += ',"error":"Lastname must not be empty"';
   }
   else if(income == null || income.length == 0)
   {
	   returnStr += ',"error":"Annual Salary must not be empty"';
   }
   else if(superAnnuation == null ||superAnnuation.length == 0)
   {
	   returnStr += ',"error":"Super Rate must not be empty"';
   }
   else if(validateExists(fs,returnStr))
   { 
	   returnStr += ',"error":""';
	   saveFile(fs,returnStr);
   }
   else{  
	   returnStr += ',"error":"Duplicate pay slip generation detected. Record is not saved"';
   }

   returnStr = '{' + returnStr + '}'; 
    
    response.writeHead(200, {'Content-Type': 'text/plain'}); 
	console.log(returnStr);
    response.write(returnStr);  
    response.end(); 
}); 


function saveFile(fs,returnStr)
{
    fs.appendFile("data/records.dat", returnStr + "\n", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log(returnStr);
    console.log("Record successfully saved !");
    });
}

function validateExists(fs,returnStr)
{ 
  var result = true;
  var findString = returnStr.substring(0,returnStr.indexOf("payFrequency")-2); 
    
  var contents = fs.readFileSync('data/records.dat', 'utf8'); 
  if(contents.indexOf(findString) < 0){ console.log("not found"); 
  }else
  {  
	result = false;
  }  
  return result;
}




var server = app.listen(8081, function () { 
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port) ;
});

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');


var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

function calIncomeTax(income)
{
   var result = 0;
   if(income > 180000) 
	result += 54547 + ((income - 180000) * 0.45 ) ;
   else if(income > 80000)
	result += 17547 + ((income - 80000) * 0.37 ) ;
   else if(income > 37000)
	result += 3572 + ((income - 37000) * 0.325 ) ;
   else if(income > 18200)
	result += (income - 18200) * 0.19  ;

   return (result / 12);
}
