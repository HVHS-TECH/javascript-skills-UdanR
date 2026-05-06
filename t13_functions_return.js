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
var price = 0;
var change = 0;
var afterTax = 0;
/****************************
Main Code
****************************/
console.log("Running t12_conditional.js");

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
            var month_wages = (money*52)/12;
            var salary = money*52;
            var fortnightly_wages = salary/26;
            var tax_money = salary;

    output.innerHTML += "<p>You earn $"+money+" weekly, at the end of the month you will have $"+month_wages+"</p>";
    output.innerHTML += "<p>You'er salary would be $"+salary+"</p>";

    } else if (selectedPaymentdays == "fortnightly"){
        var fortnightly_wages = Number(FORM_WAGES.value);
        var salary = fortnightly_wages*26;
        var weekly_wages = salary/52;
        var month_wages = salary/12;
        var tax_money = salary;
        output.innerHTML += "<p>You earn $"+weekly_wages+" weekly, $"+fortnightly_wages+" fortnightly and at the end of the month you will have $"+month_wages+"</p>";
        output.innerHTML += "<p>You'er salary would be $"+salary+"</p>";

    } else if (selectedPaymentdays == "monthly"){
        var month_wages = Number(FORM_WAGES.value);
        var salary = month_wages*12;
        var weekly_wages = salary/52;
        var fortnightly_wages = salary/26;
        var tax_money = salary;
        output.innerHTML += "<p>You earn $"+weekly_wages+" weekly, $"+fortnightly_wages+" fortnightly and at the end of the month you will have $"+month_wages+"</p>";
        output.innerHTML += "<p>You'er salary would be $"+salary+"</p>";

    } else{
        var salary = Number(FORM_WAGES.value);
        var month_wages = salary/12;
        var fortnightly_wages = salary/26;
        var weekly_wages = salary/52;
        var tax_money = salary;
        output.innerHTML += "<p>You earn $"+weekly_wages+" weekly, $"+fortnightly_wages+" fortnightly and at the end of the month you will have $"+month_wages+"</p>";
        output.innerHTML += "<p>You'er salary would be $"+salary+"</p>";

    }
    if (tax_money <= 15600){
        var taxed_amount = tax_money*10.5/100;
         afterTax = (tax_money - taxed_amount);
    } else if (tax_money <=53500){
        var orginal_money = tax_money;
        tax_money = tax_money-15600;
        var orginal_money = tax_money;
        var taxed_amount = (17.5/100*tax_money)+1638;
         afterTax = (orginal_money - taxed_amount);
    } else if (tax_money <=78100){
        var orginal_money = tax_money;
        tax_money=tax_money-53500;
        var taxed_amount = (30/100*tax_money)+1638+6632.5;
         afterTax = (orginal_money - taxed_amount);
    } else if (tax_money <=180000){
        var orginal_money = tax_money;
        tax_money=tax_money-78100;
        var taxed_amount = (33/100*tax_money)+1638+6632.5+7380;
         afterTax = (orginal_money - taxed_amount);
    } else {
        var orginal_money = tax_money;
        tax_money=tax_money-180000;
        var taxed_amount = (39/100*tax_money)+1638+6632.5+7380+33627;
         afterTax = (orginal_money - taxed_amount);
    }
        output.innerHTML += "<p>You're tax is $"+taxed_amount+"</p>";
        output.innerHTML += "<p>You will have $"+afterTax+" after tax</p>";
}
const outputChange = document.getElementById ("changearea");
const selectElement_spending = document.getElementById('spendingfrequency');
function calculateChange (){
    const spendingamount_Input = document.getElementById ("spendingamount_input");
    price = Number(spendingamount_Input.value);
    const selectedSpendingfrequency = selectElement_spending.value;
    if (selectedSpendingfrequency == "weekly"){
        change = Number(afterTax-price);
        console.log ("price "+price);
        console.log ("aftertax "+afterTax);
        console.log ("change "+change);
        console.log ("orginal_money "+orginal_money);
        outputChange.innerHTML += "<p>You will get $"+change+" change.</p>";
        return change;

    } else if (selectedSpendingfrequency == "fortnightly"){
        change = afterTax-price;
        outputChange.innerHTML += "<p>You will get $"+change+" change.</p>";
        return change;
    } else if (selectedSpendingfrequency == "monthly"){
        change = afterTax-price;
        outputChange.innerHTML += "<p>You will get $"+change+" change.</p>";
        return change;
    } else{
        change = afterTax-price;
        outputChange.innerHTML += "<p>You will get $"+change+" change.</p>";
        return change;
}
}

    
