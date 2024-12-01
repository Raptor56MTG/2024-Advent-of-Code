const { p } = require('../FastPrint/print.js');
const fs = require('fs');

function problem1() {
    try {
        const data = fs.readFileSync('problem3.txt', 'utf8');
        let rows = data.split("\r\n");
        let sum = 0;
        for (row of rows) {
            p(row);
            row = row.match(/\d+/g).join("").split("");
            p(row);
            value = row[0] + row[row.length - 1];
            p(value);
            sum += parseInt(value);
        }
        return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

console.log(problem1())
