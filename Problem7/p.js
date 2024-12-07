const { p } = require('../FastPrint/print.js');
const fs = require('fs');

function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let outputs = data.split('\r\n').map(x => parseInt(x.split(":")[0]));
        let inputs = data.split('\r\n').map(x => x.split(": ")[1]).map(x => x.split(" ").map(x => parseInt(x)));
        let validSums = new Set();
        for (let i = 0; i < data.split('\r\n').length; i++) {
            let output = outputs[i];
            let input = inputs[i];
            let operations = [];
            let base = 2;
            let padding = (base ** (input.length - 1)).toString(base).length - 1;
            for (let j = 0; j < base ** (input.length - 1); j++) {
                let binary = j.toString(base).padStart(padding, '0');
                operations.push(binary.split('').map(x => x === '0' ? '*' : '+'));
            }
            let firstTerm = [input[0]];
            input = input.slice(1);
            for (operation of operations) {
                equation = firstTerm.concat(operation.flatMap((term, index) => [term, input[index]]));
                total = equation[0];
                equation = equation.slice(1);
                equation.forEach((_, index) => {
                    if (index % 2 == 0) {
                        if (equation[index] === '*') {
                            total *= equation[index + 1];
                        }
                        else {
                            total += equation[index + 1];
                        }
                    }
                });
                if(total === output) {
                    validSums.add(total);
                }
            }
        }
        return [...validSums].reduce((term, sum) => term + sum);
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let outputs = data.split('\r\n').map(x => parseInt(x.split(":")[0]));
        let inputs = data.split('\r\n').map(x => x.split(": ")[1]).map(x => x.split(" ").map(x => parseInt(x)));
        let validSums = new Set();
        for (let i = 0; i < data.split('\r\n').length; i++) {
            let output = outputs[i];
            let input = inputs[i];
            let operations = [];
            let base = 3;
            let padding = (base ** (input.length - 1)).toString(base).length - 1;
            for (let j = 0; j < base ** (input.length - 1); j++) {
                let ternary = j.toString(base).padStart(padding, '0');
                operations.push(ternary.split('').map(x => x === '0' ? '*' : x === '1' ? '+' : '|'));
            }
            let firstTerm = [input[0]];
            input = input.slice(1);
            for (operation of operations) {
                equation = firstTerm.concat(operation.flatMap((term, index) => [term, input[index]]));
                total = equation[0];
                equation = equation.slice(1);
                equation.forEach((_, index) => {
                    if (index % 2 == 0) {
                        if (equation[index] === '*') {
                            total *= equation[index + 1];
                        }
                        if (equation[index] === '+') {
                            total += equation[index + 1];
                        }
                        if ((equation[index] === '|')) {
                            total = parseInt(`${total}${equation[index + 1]}`);
                        }
                    }
                });
                if(total === output) {
                    validSums.add(total);
                }
            }
        }
        return [...validSums].reduce((term, sum) => term + sum);
    } catch (err) {
        console.error('Error:', err);
    }
}

console.log(problem1())
console.log(problem2())
