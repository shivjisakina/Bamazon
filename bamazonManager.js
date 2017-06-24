// PSEUDO CODE

// INQUIRER LIST:
// 1.View Products for Sale,
// 2.View Low Inventory
// 3.Add to Inventory
// 4.Add New Product

// 1: list all items, provide ids, names, prices, quantities
// 2: List items with quantity of < 5
// 3: PROMPT to add more of any item currently in the store
// 4: INPUT to add new product to store

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

    list()

});

function list() {

    inquirer.prompt([{

        name: "list",
        type: "rawlist",
        message: "Please choose from one of the following options",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

    }
    ]).then(function (input) {

        switch(input.list) {

            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                lowInventory()
                break;

            case "Add to Inventory":
                addInventory()
                break;

            case "Add New Product":
                addProduct();
                break;
        }
    });
}

function viewProducts() {

    console.log("--View Products--");
    connection.query("SELECT * FROM `customerView`" , function (queryError, response){

        if (queryError)
            throw queryError;

        response.forEach(function (row) {
            console.log("id = ", "'", row.id, "'",
                "Product Name = ", "'", row.product_name, "'",
                "Price:", "'", row.price, "'",
                "Quantity", "'", row.stock_quantity, "'")
        }); // response.forEach
    }) // connection.query
} // viewProducts()

function lowInventory() {

    connection.query("SELECT `product_name`, `stock_quantity` FROM `customerView` WHERE `stock_quantity`< 5 ORDER BY `stock_quantity` DESC;", function(err, results) {
        if (err)
            throw err;

        console.log(results)
    })
}

function addInventory() {
    console.log("--Prompt to add more of any item in store--")

    connection.query("SELECT * FROM `customerView`", function (err, results) {
        if (err)
            throw err;

        inquirer.prompt([{
            type: 'rawlist',
            name: "addProduct",
            message: "Add more of any product that is currently in the store",
            choices: function () {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name + " " + "$ " + results[i].price );
                }
                return choiceArray;
            }
        }]).then(function (answer) {

            results.stock_quantity++
            //console.log("you added another " + results.product_name)

        })
    })
}

function addProduct() {
    console.log("--Input to add new product to store--")
}