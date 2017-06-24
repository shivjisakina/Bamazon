var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'Bamazon'

});

connection.connect(function(err) {

    if (err) throw err;

    console.log("Connected to mysql server with the ID " + connection.threadId)

    menu()

});

function menu() {

    inquirer.prompt([{

        name: "menu",
        type: "rawlist",
        message: "Please choose from one of the following options",
        choices: ["View Product Sales by Department", "Create New Department"]

    }

    ]).then(function (input) {

        switch(input.menu) {

            case "View Products Sales by Department":

                salesDepartment();

                break;

            case "Create New Department":

                newDepartment();

                break;

            default:

                console.log("Please choose from one of the 2 options!")

        } // switch function

    }); // .then funcition

} // menu()

function salesDepartment() {

} // salesDepartment

function newDepartment() {

} // newDepartment