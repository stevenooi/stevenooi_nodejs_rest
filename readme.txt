Assumption
----------
i) Pay Date is the end of current month
ii) Pay Frequency is always Monthly
iii) Gross Income is Annual Income / 12 and rounded
iv) No client side validation available
v) Net income is rounded
vi) Super is rounded
vii) Pay is rounded

Reason to Choose AngularJS
--------------------------
i) It provide structure to Javascript
   - It is easier to read, more structured 
ii) Two Way Data Binding
   - It provides two way data binding which is easier
     to connect models to view layer
iii) Templates
   - Templates give us a clear boundary separating the 
     view layer from the rest of the framework

Installation Steps
------------------
Pre-requisites
--------------
i) Ensure NodeJS is installed
ii) Ensure Tomcat is installed
iii) Ensure Tomcat is running with port 8080

Steps 
-----
i) Extract MYOB_Challenge_Server to C:
ii) type the command below  
    cd MYOB_Challenge_Server
    npm install express
    node server
iii) Extract MYOB_Challenge_Server to tomcat root directory
iv) Optional : if tomcat is not running on port 8080,
               goto C:\MYOB_Challenge_Server, 
               Open server.js using notepad,
               look for the text below 
               response.header('Access-Control-Allow-Origin', 
               change the port number right beside the text to
               the port number your tomcat is running
v) Open browser, insert the URL as below
   http://localhost:8080/MYOB_Challenge/index.html

Test Case : 
i) INPUT
   -----
   Firstname : Steven
   Lastname : Ooi
   Annual Salary : 200000
   Super Rate : 9

   RESULT
   ------
   Gross Income : 16667.00
   Income Tax : 5296.00
   Net Income : 11371.00
   Super : 1500.00
   Pay : 9871.00

ii)INPUT
   -----
   Firstname : Steven
   Lastname : Ooi2
   Annual Salary : 100000
   Super Rate : 9

   RESULT
   ------
   Gross Income : 8333.00
   Income Tax : 2079.00
   Net Income : 6254.00
   Super : 750.00
   Pay : 5504.00

iii)INPUT
    -----
   Firstname : Steven
   Lastname : Ooi3
   Annual Salary : 70000
   Super Rate : 9

   RESULT
   ------
   Gross Income : 5833.00
   Income Tax : 1191.00
   Net Income : 4642.00
   Super : 525.00
   Pay : 4117.00

iv)INPUT
   -----
   Firstname : Steven
   Lastname : Ooi4
   Annual Salary : 30000
   Super Rate : 9

   RESULT
   ------
   Gross Income : 2500.00
   Income Tax : 187.00
   Net Income : 2313.00
   Super : 225.00
   Pay : 2088.00
 
v) INPUT
   -----
   Firstname : Steven
   Lastname : Ooi5
   Annual Salary : 10000
   Super Rate : 9

   RESULT
   ------
   Gross Income : 833.00
   Income Tax : 0.00
   Net Income : 833.00
   Super : 75.00
   Pay : 758.00
 
v) INPUT
   -----
   Firstname : Steven
   Lastname : Ooi
   Annual Salary : 10000
   Super Rate : 9

   RESULT
   ------ 
   Duplicate pay slip generation detected. Record is not saved

vi)INPUT
   -----
   Firstname : Steven
   Lastname : 
   Annual Salary : 10000
   Super Rate : 9

   RESULT
   ------ 
   Lastname must not be empty

vii)INPUT
    -----
   Firstname : 
   Lastname : Ooi
   Annual Salary : 10000
   Super Rate : 9

   RESULT
   ------ 
   Firstname must not be empty

viii)INPUT
     -----
   Firstname : Steven
   Lastname : Ooi
   Annual Salary : 
   Super Rate : 9

   RESULT
   ------ 
   Annual Salary must not be empty

viiii)INPUT
      -----
   Firstname : Steven
   Lastname : Ooi
   Annual Salary : 100000
   Super Rate : 

   RESULT
   ------ 
   Super Rate must not be empty

