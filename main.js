#!/usr/bin/env node
let fs= require('fs')
let path=require('path')
const chalk= require('chalk');
let helpObj=require('./command/help')
let organizeObj= require('./command/organize')
let treeObj= require('./command/tree')

let inputArgument=process.argv.slice(2);
// console.log(inputArgument);
// node main.js tree "directorPath"
// node main.js organise "directoryPath"
// // node main.js help 
// console.log(inputArgument)

switch(inputArgument[0]){
    case "tree":
        treeObj.treefn(inputArgument[1]);
        break;
    case "organize":
        organizeObj.organizefn(inputArgument[1])
        console.log(chalk.green("\n!!! file organizing done"))
        break;
    case 'help':
        helpObj.helpKey()
        break;
    default:
        console.log("!!! you have entered wrong command !!! ")
        helpObj.helpKey()
        break;
}
