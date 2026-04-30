/* Paste your code from the last task */
/****************************
Introduction
****************************/

// Variables
var year = 2030
var money = 0;
var month_wages = 0;
var salary = 0;
var username = "Mr.Legend";
var age = 22;
var born_age = year;
var future_age = year;

/****************************
Main Code
****************************/
console.log("Running t11_data_types.js");

const output = document.getElementById ("spaceForJavaScriptOutput");

writeline()
writeline()
writeline()
writeline()


/*Welcomeline(username, age, year, money, future_age, half_money)
*/
/****************************
Functions
****************************/
function writeline(){
    output.innerHTML += "<p>Less code Matters</p>";
}

function getFormInfo (){
    const FORM_NAME = document.getElementById ("name_input");
    var username = FORM_NAME.value;
    const FORM_AGE = document.getElementById ("age_input");
    var age = Number(FORM_AGE.value);
    const FORM_YEAR = document.getElementById ("year_input");
    var year = Number(FORM_YEAR.value);
    output.innerHTML = "<h1>Welcome, "+username+"</h1>";
    output.innerHTML += "<p>In "+year+", You are "+age+" years old</p>";
    if (selectedPotion == )
    const FORM_WAGES = document.getElementById ("wages_input");
    var money = Number(FORM_WAGES.value);
    month_wages = (money*52)/12;
    salary = money*52;

    output.innerHTML += "<p>You earn $"+money+"weekly, at the end of the month you will have $"+month_wages+"</p>";
    output.innerHTML += "<p>You'er salary would be $"+salary+"</p>";

}
