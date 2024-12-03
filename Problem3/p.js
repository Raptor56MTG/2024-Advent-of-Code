const { p } = require('../FastPrint/print.js');
const fs = require('fs');

function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        // /mul matches mul
        // \( gets the first parenthesis (need \ due to them being special characters)
        // \d+ gets numbers
        // , gets the comma
        // \) gets the second parenthesis (need \ due to them being special characters)
        // /g gets all of them globally, not just the first match.
        const regex = /mul\(\d+,\d+\)/g;
        let multiples = data.match(regex);
        let sum = 0;
        for (m of multiples) {
            let terms = m.split(",");
            let a = parseInt(terms[0].replace('mul(', ''));
            let b = parseInt(terms[1].replace(')', ''));
            sum += a * b;
        }
        return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        // /mul matches mul
        // \( gets the first parenthesis (need \ due to them being special characters)
        // \d+ gets numbers
        // , gets the comma
        // \) gets the second parenthesis (need \ due to them being special characters)
        // do matches do
        // don't matches don't
        // /g gets all of them globally, not just the first match.
        // | means to search for any of the regular expressions.
        const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
        let multiples = data.match(regex);
        let moving = true;
        let sum = 0;
        for(m of multiples) {
            if (m === 'do()') {
                moving = true;
            }
            else if (m === "don't()") {
                moving = false;
            }
            else if (moving) {
                let terms = m.split(",");
                let a = parseInt(terms[0].replace('mul(', ''));
                let b = parseInt(terms[1].replace(')', ''));
                sum += a * b;
            }
        }
        return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}
console.log(problem1())
console.log(problem2())
