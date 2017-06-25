/*PRODUCTS*/


DROP DATABASE IF EXISTS `Bamazon`;
CREATE DATABASE `Bamazon`;

USE `Bamazon`;

CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `product_name` varchar(11) DEFAULT NULL,
  `department_name` varchar(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  `autographed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*DEPARTMENTS*/

CREATE TABLE `departments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `department_id` int(11) DEFAULT NULL,
  `department_name` int(11) DEFAULT NULL,
  `over_head_costs` int(11) DEFAULT NULL,
  `product_sales` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;