/* Paste your code from the last task */
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
var half_money = money;
/****************************
Main Code
****************************/
console.log("Running t10_input_from_HTML.js");
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

writeline()
writeline()
writeline()
writeline()


/*Welcomeline(username, age, year, money, future_age, half_money)
*/
/****************************
Functions _username, _age, _year, _born_age
****************************/
function writeline(){
    output.innerHTML += "<p>Less code Matters</p>";
}
function Welcomeline(_username, _age, _year, _money, _future_age, _half_money){
    output.innerHTML = "<h1>Wellcome back, "+_username+"</h1>";
    output.innerHTML += "<h2>You are "+_age+" years old</h2>";
    output.innerHTML += "<h2>Added By JavaScript</h2>";
    output.innerHTML += "<p>Howide: "+ _username + "</p>";
    output.innerHTML += "<p>As of " + _year + " you are "+ _age + " years old</p>";
    output.innerHTML += "<p>In 10 years you will be " + _future_age + " years old</p>";
    output.innerHTML += "<p>You had $" + _money + "</p>";
    output.innerHTML += "<p>You spend half of your money, now you have $" + _half_money + "</p>";
    output.innerHTML += "<img src='assets/dtec_favicon.png' alt='Dtech Favicon'>";

}

function getFormInfo (){
    const FORM_NAME = document.getElementById ("name_input");
    var username = FORM_NAME.value;
    const FORM_AGE = document.getElementById ("age_input");
    var age = number(FORM_AGE.value);
    const FORM_YEAR = document.getElementById ("year_input");
    var year = number(FORM_YEAR.value);
    output.innerHTML = "<h1>Welcome, "+username+"</h1>";
    output.innerHTML += "<p>In "+year+", You are "+age+" years old</p>";

}
