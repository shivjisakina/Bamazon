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

function menu() {

} // menu()

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

                lowInventory();

                break;

            case "Add to Inventory":

                addInventory();

                break;

            case "Add New Product":

                addProduct();

                break;

        } // switch function

    }); // .then function

} // list()

function viewProducts() {

    console.log("--View Products--");

    connection.query("SELECT * FROM `products`" , function (queryError, response){

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

    connection.query("SELECT `product_name`, `stock_quantity` FROM `products` WHERE `stock_quantity`< 5 ORDER BY `stock_quantity` DESC;", function(err, results) {

        if (err)
            throw err;

        console.log(results)

    }); // connection.query
} // lowInventory()

function addInventory() {

    console.log("--Prompt to add more of any item in store--");

    connection.query("SELECT * FROM `products`", function (err, results) {
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

        }) // function (answer)

    }); // connection.query

} // addInventory

function addProduct() {

    console.log("--Input to add new product to store--");

    inquirer.prompt([{

        type: "confirm",
        name: "question",
        message: "Would you like to add a new product?"

    }, {

        type: "input",
        name: "item_id",
        message: "Add the items id:"

    }, {

        type: "input",
        name: "product_name",
        message: "Add the product name:"

    }, {

        type: "input",
        name: "department_name",
        message: "Add the department:"

    }, {
        type: "input",
        name: "price",
        message: "Add a price:"

    }, {
        type: "input",
        name: "stock_quantity",
        message: "Add the stock quantity"

    }, {

        type: "input",
        name: "autographed",
        message: "Is it autographed? (0/1)"

    }]).then(function (product) {

        var item_id = product.item_id;
        var product_name = product.product_name;
        var department_name = product.department_name;
        var price = product.price;
        var stock_quantity = product.stock_quantity;
        var autographed = product.autographed;

        connection.query("INSERT INTO `products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`, `autographed`) VALUES (?, ?, ?, ?, ?, ?)", [item_id, product_name, department_name, price, stock_quantity, autographed], function(err, data) {

            if (err) {
                throw err
            }

            console.log("Your product " + product_name + " has been added!")

        }); //connection.query

    }); // .then function

} //addProduct()
