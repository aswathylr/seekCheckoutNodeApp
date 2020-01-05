#!/usr/bin/env node

var calculate = require('./discount');

const chalk = require("chalk");
const boxen = require("boxen");

const welcomeMsg = chalk.white.bold("Welcome to Seek Checkout!");

const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};

const msgBox = boxen( welcomeMsg, boxenOptions );

console.log(msgBox);

const yargs = require("yargs");

const options = yargs
 .usage("Usage: -c <customer>")
 .option("c", { alias: "customer", describe: "Customer Name", type: "string", demandOption: true })
 .option("o", { alias: "offerings", describe: "Offerings Chosen", type: "array", demandOption: true })
 .argv;

 // What seek offers
let products = new Map([["classic" ,269.99], ["standout" ,322.99], ["premium" ,394.99]]);
let letsCount = new Map([["classic" ,0], ["standout" ,0], ["premium" ,0]]);

const customerName = `Customer: ${options.customer}`;
const offerings = options.offerings;
order = offerings[0].split(',')

order.forEach(function (item) {
  if (letsCount.has(item)) {
    letsCount.set(item, parseInt(letsCount.get(item), 10) + parseInt(1, 10))
  }
});
console.log(customerName);
console.log(letsCount)

var cost = 0

if (customerName.match(/Myer/i)) {
  for (const [key, value] of letsCount.entries()) {
    if (products.has(key)) {
      if (key.match(/standout/i)) {
        cost = cost + (calculate.findDiscountedPrice (4, products.get(key), 5) * value)
      } else if (key.match(/premium/i)){
        cost = cost + (389.99 * value)
      } else {
        cost = cost + products.get(key) * value
      }
    }
  }
} else if (customerName.match(/SecondBite/i)) {
  console.log("SecondBite 3 for 2 deals")
  for (const [key, value] of letsCount.entries()) {
    if (products.has(key)) {
      if (key.match(/classic/i)) {
        cost = cost + (calculate.findDiscountedPrice (2, products.get(key), 3) * value)
      } else {
        cost = cost + products.get(key) * value
      }
    }
  }
} else if (customerName.match(/Axil/i)) {
  for (const [key, value] of letsCount.entries()) {
    if (products.has(key)) {
      if (key.match(/standout/i)) {
        cost = cost + (299.99 * value)
      } else {
        cost = cost + products.get(key) * value
      }
    }
  }
} else {
  console.log("Default")
  for (const [key, value] of letsCount.entries()) {
    if (products.has(key)) {
      cost = cost + products.get(key) * value
    }
  }
}

console.log("Total: ",cost);
