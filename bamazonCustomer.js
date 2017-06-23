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

connection.connect(function(err, response) {
    if (err) throw err;

    console.log("Connected to mysql server with the ID " + connection.threadId)

    getcolumns()
});

function getcolumns() {

    connection.query("SELECT * FROM `customerView`" , function (queryError, response){
        if (queryError)
            throw queryError;

        response.forEach(function (row) {
            console.log("id = ", "'", row.id, "'",
                "Product Name = ", "'", row.product_name, "'",
                "Price:", "'", row.price, "'")
        });
    })

}