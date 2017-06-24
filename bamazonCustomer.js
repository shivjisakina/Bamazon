//PSEUDO CODE

// Get mysql and inquirer npm
// Get 'ids', 'names', 'prices of products for sale'
// Prompt 1: Ask user for ID of product they want to buy
// Prompt 2: Ask user how many units they want to buy
// After user places order, check to see if there's enough stock. (if statement)
// Else, log "insufficient quantity"
// If there's sufficient stock, place the order.
// Update MYSQL
// Show customer purchase total

//functions:

//getcolumns() to get the `ids`, `names`, and `prices`
//promptOne() to sk user for ID of product they want to buy
//promptTwo() to sk user how many units they want to buy


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

    getStarted()
});


function getStarted() {

    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to buy ____ Merchendise?",
            name: "confirm",
            default: true
        }
    ]).then(function (answers) {
        if (answers.confirm) {
            chooseProduct();
        } else {
            console.log("Okay, see you next time")
        }
    });
}


function chooseProduct() {
    connection.query("SELECT * FROM `products`", function(err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "rawlist",
                message: "Please choose the product you would like to buy:",
                name: "choice",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name + " " + results[i].price + "$");
                    }
                    return choiceArray;
                }
            },
            {
                type: "input",
                message: "How many would you like?",
                name: "quantity"
            }
        ]).then(function(answer){
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice){
                    chosenItem = results[i];
                }
            }

            if (results.stock_quantity < parseInt(answer.quantity)) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: answer.quantity
                        },
                        {
                            id: chosenItem.id
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                        console.log("Order successful!");
                        start();
                    }
                );
            } else {
                console.log("Sorry, item is out of stock...");
                getStarted();
            }
        });
    });
}