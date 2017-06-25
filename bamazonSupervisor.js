var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');



var connection = mysql.createConnection({

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'Bamazon'

});

connection.connect(function(err) {

    if (err)
        throw err;

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
            case "1":

                salesDepartment();

                break;

            case "Create New Department":

                newDepartment();

                break;
        } // switch function

    }); // .then function

} // menu()

function salesDepartment() {

    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
    });


    table.push(
        ['foo', 'bar', 'baz']
        , ['frob', 'bar', 'quuz']
    );

    console.log(table.toString());

} // salesDepartment

function newDepartment() {

} // newDepartment