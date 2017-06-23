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


        if (input.list[0]) {
            viewProducts()
        }

        else if (input.list[1]) {
            lowInventory()
        }

        else if (input.list[2]) {
            addInventory()
        }

        else if (input.list[3]) {
            addProduct()
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
    console.log("--List items with quantity < 5--")
}

function addInventory() {
    console.log("--Prompt to add more of any item in store--")
}

function addProduct() {
    console.log("--Input to add new product to store--")
}