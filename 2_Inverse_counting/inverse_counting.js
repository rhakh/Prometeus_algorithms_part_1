"use strict"

function inverseCounting(data, first, second) {
    let firstArr = data[first].split(' ');
    let secndArr = data[second].split(' ');
    let inverseArr = new Array(firstArr.length);
    let inverseCount = 0;

    // first element is a user number, so miss it
    for (let i = 1; i < firstArr.length; i++) {
        inverseArr[parseInt(firstArr[i])] = parseInt(secndArr[i]);
    }

    // due to first element is empty
    for (let i = 1; i < inverseArr.length - 1; i++) {
        for (let j = i + 1; j < inverseArr.length; j++) {
            if (inverseArr[i] > inverseArr[j])
                inverseCount++;
        }
    }

    return (inverseCount);
}

function readFile(fileName) {
    let fs = require("fs");
    let text = fs.readFileSync(fileName, "utf-8");
    let data = text.split("\n");

    return (data);
}


if (process.argv.length != 5) {
    console.log("Usage: node " + process.argv[1].replace(/^.*[\\\/]/, '') + " FILE_NAME USER1_NUMBER USER2_NUMBER");
    process.exit();
}

let fileName = process.argv[2];
let data = readFile(fileName);
let first = parseInt(process.argv[3]);
let second = parseInt(process.argv[4]);
let inversionCount = inverseCounting(data, first, second);

console.log(inversionCount);
