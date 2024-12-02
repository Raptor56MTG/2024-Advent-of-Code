const { p } = require('../FastPrint/print.js');
const fs = require('fs');

function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let rows = data.split("\r\n");
        let left = [];
        let right = [];
        for (r of rows) {
            let x = r.split("   ");
            left.push(parseInt(x[0]));
            right.push(parseInt(x[1]));
        }
        left.sort((a, b) => a - b);
        right.sort((a, b) => a - b);
        sum = 0;
        for (let i = 0; i < left.length; i++) {
            sum += Math.abs(left[i] - right[i]);
        }
        return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let rows = data.split("\r\n");
        let left = [];
        let right = [];
        for (r of rows) {
            let x = r.split("   ");
            left.push(parseInt(x[0]));
            right.push(parseInt(x[1]));
        }
        let sum = 0;
        for (term of left) {
            let count = 0;
            for (check of right) {
                if (term === check) {
                    count += 1;
                }
            }
            sum += term * count;
        }
        return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

console.log(problem1())
console.log(problem2())
