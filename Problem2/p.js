const { p } = require('../FastPrint/print.js');
const fs = require('fs');


function validRow(row) {
    let firstState = row[0] < row[1] ? true : false; 
    let valid = true;
    for (let i = 0; i < row.length - 1; i++) {
        if (Math.abs(row[i] - row[i + 1]) > 3 || 
            Math.abs(row[i] - row[i + 1]) < 1) {
                valid = false;
        }
        let pairState = row[i] < row[i + 1] ? true : false;
        if (firstState !== pairState) {
            valid = false;
        }
    }
    return valid;
}

function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let rows = data.split("\r\n").map(x => x.split(" ").map(x => parseInt(x)));
        let safe = 0;
        for (row of rows) {
            let valid = validRow(row);
            safe += valid ? 1 : 0;
        }
        return safe;
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let rows = data.split("\r\n").map(x => x.split(" ").map(x => parseInt(x)));
        let safe = 0;
        for (row of rows) {   
            let subRows = [];
            for (let i = 0; i < row.length; i++) {
                let subRow = row.slice(0, i).concat(row.slice(i + 1));
                subRows.push(subRow);
            }
            let valid = false;
            for (row of subRows) {
                if (validRow(row)) {
                    valid = true;
                };
            }
            safe += valid ? 1 : 0;
        }
        return safe;
    } catch (err) {
        console.error('Error:', err);
    }
}

console.log(problem1())
console.log(problem2())
