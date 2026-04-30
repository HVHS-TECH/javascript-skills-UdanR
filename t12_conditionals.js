/* Paste your code from the last task */
/****************************
Introduction
****************************/

// Variables
var year = 2030
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
    const selectElement = document.getElementById('paymentdays');
    const selectedPaymentdays = selectElement.value;
    const FORM_WAGES = document.getElementById ("wages_input");
    if (selectedPaymentdays == "weekly"){
            var money = Number(FORM_WAGES.value);
            var tax_money = money;
            var month_wages = (money*52)/12;
            var salary = money*52;
            var fortnightly_wages = salary/26;

    output.innerHTML += "<p>You earn $"+money+"weekly, at the end of the month you will have $"+month_wages+"</p>";
    output.innerHTML += "<p>You'er salary would be $"+salary+"</p>";

    } else if (selectedPaymentdays == "fortnightly"){
        var fortnightly_wages = Number(FORM_WAGES.value);
        var tax_money = fortnightly_wages;
        var salary = fortnightly_wages*26;
        var weekly_wages = salary/52;
        var month_wages = salary/12;
        output.innerHTML += "<p>You earn $"+weekly_wages+"weekly, $"+fortnightly_wages+" fortnightly and at the end of the month you will have $"+month_wages+"</p>";
        output.innerHTML += "<p>You'er salary would be $"+salary+"</p>";

    } else if (selectedPaymentdays == "monthly"){
        var month_wages = Number(FORM_WAGES.value);
        var tax_money = month_wages;
        var salary = month_wages*12;
        var weekly_wages = salary/52;
        var fortnightly_wages = salary/26;
        output.innerHTML += "<p>You earn $"+weekly_wages+"weekly, $"+fortnightly_wages+" fortnightly and at the end of the month you will have $"+month_wages+"</p>";
        output.innerHTML += "<p>You'er salary would be $"+salary+"</p>";

    } else{
        var salary = Number(FORM_WAGES.value);
        var tax_money = salary;
        var month_wages = salary/12;
        var fortnightly_wages = salary/26;
        var weekly_wages = salary/52;
        output.innerHTML += "<p>You earn $"+weekly_wages+"weekly, $"+fortnightly_wages+" fortnightly and at the end of the month you will have $"+month_wages+"</p>";
        output.innerHTML += "<p>You'er salary would be $"+salary+"</p>";

    }
    if (tax_money){}

}
