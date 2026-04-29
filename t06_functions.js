/* Paste your code from task 5 here */
/****************************
Introduction
****************************/

// Variables
var year = 2030
var username = "Mr.Legend";
var age = 22;
var money = 10;
var born_age = year;
var future_age = year;
var half_money = money
/****************************
Main Code
****************************/
console.log("Running t06_functions.js");
console.log(half_money / 2);
half_money = half_money/2;
console.log(born_age - age);
born_age = year - age;
console.log(future_age + 10);
future_age = age + 10;
console.log("Howdie,"+ username);
console.log("As of " + year + " you are "+ age + " years old");
console.log("You were born in " + born_age);
console.log("In 10 years you will be " + future_age + " years old");
console.log("You have $" + money);
console.log("You spend half of your money, now you have $" + half_money);

const output = document.getElementById ("spaceForJavaScriptOutput");
output.innerHTML = "<h2>Added By JavaScript</h2>";
output.innerHTML += "<p>Howide: "+ username + "</p>";
output.innerHTML += "<p>As of " + year + " you are "+ age + " years old</p>";
output.innerHTML += "<p>In 10 years you will be " + future_age + " years old</p>";
output.innerHTML += "<p>You had $" + money + "</p>";
output.innerHTML += "<p>You spend half of your money, now you have $" + half_money + "</p>";
output.innerHTML += "<img src='assets/dtec_favicon.png' alt='Dtech Favicon'>";
writeline()
writeline()
writeline()
writeline()

/****************************
Functions
****************************/
function writeline(){
    output.innerHTML += "<p>Less code Matters</p>";
}
