/* Paste your code from the last task */
/* Paste your code from the last task */
/* Paste your code from the last task */
/****************************
Introduction
****************************/

// Variables
var year = 2030;
var users = [{name: username, age: age, grossincome: salary, netincome: 0, Chocolate_Rating: 0}];
var money = 0;
var tax_money = 0;
var taxed_amount = 0;
var weekly_wages = 0;
var fortnightly_wages = 0;
var month_wages = 0;
var salary = 0;
var username = "Mr.Legend";
var age = 22;
var born_age = year;
var future_age = year;
var price = 0;
var change = 0;
var afterTax = 0;
var orginal_money= 0;
/****************************
Main Code
****************************/
console.log("Running t19_string_handling.js");

const output = document.getElementById ("spaceForJavaScriptOutput");
const AGE_LIMITE = 6;
const NAME_LENGHT_LIMIT = 3;
const TAX_BRACKET_ONE = 15600;
const TAX_BRACKET_TWO = 53500;
const TAX_BRACKET_THREE = 78100;
const TAX_BRACKET_FOUR = 180000;
const TAX_BRACKET_ONE_AMOUNT = 10.5;
const TAX_BRACKET_TWO_AMOUNT = 17.5;
const TAX_BRACKET_THREE_AMOUNT = 30;
const TAX_BRACKET_FOUR_AMOUNT = 33;
const TAX_BRACKET_FIVE_AMOUNT = 39;


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

function getFormInfo (){
    const FORM_NAME = document.getElementById ("name_input");
    var username = FORM_NAME.value;
    console.log (username);
    console.log (username.length);
    if (username.length < NAME_LENGHT_LIMIT) {
        alert("Error: Username is too short! Username must be 3 letters or longer");
        return;
}
    const FORM_AGE = document.getElementById ("age_input");
    var age = Number(FORM_AGE.value);
    if (age < AGE_LIMITE){
        alert("Erro: Too Young, need to be aleast 6 years old");
        return;
    }
    if (age >130){
        alert("Damm!, How are you still alive?");
    }
    const FORM_YEAR = document.getElementById ("year_input");
    var year = Number(FORM_YEAR.value);
    output.innerHTML = "<h1>Welcome, "+username+"</h1>";
    output.innerHTML += "<p>In "+year+", You are "+age+" years old</p>";
    const FORM_WAGES = document.getElementById ("wages_input");
    money = Number(FORM_WAGES.value);

    output.innerHTML += "<p>You earn $"+money+" weekly, at the end of the month you will have $"+month_wages+"</p>";
    output.innerHTML += "<p>You'er salary would be $"+salary+"</p>";

    } 