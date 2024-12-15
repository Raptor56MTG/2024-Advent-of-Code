const { p } = require('../FastPrint/print.js');
const fs = require('fs');

/*
* Use some basic matrix math and linear algebra to solve a system of equations.
*/
function solveLinearEquations(inputA, inputB, output, part) {

    // make input matrix
    let A = [[inputA[0], inputB[0]],
             [inputA[1], inputB[1]]];
    
    // make output matrix
    let B = [[output[0]], [output[1]]]

    // Calculate the determinant of A
    let detA = inputA[0] * inputB[1] - inputA[1] * inputB[0];
  
    if (detA === 0) {
      return;
    }
  
    // Calculate the inverse of A
    const invA = [
      [inputB[1] / detA, -inputB[0] / detA],
      [-inputA[1] / detA, inputA[0] / detA]
    ];
  
    // Multiply invA by B to get the solution [x, y]
    let x = invA[0][0] * B[0] + invA[0][1] * B[1];
    let y = invA[1][0] * B[0] + invA[1][1] * B[1];

    // floating point precision yay!
    if (part === 'part1') {
        x = Math.round(x * 1e20) / 1e20;
        y = Math.round(y * 1e20) / 1e20;
    // part 2 is messy, so just return rounded integers and plug and chug.
    } else {
        x = Math.round(x);
        y = Math.round(y);
    }
    return { x, y };
}

function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let sections = data.split('\r\n\r\n').map(x => x.split('\r\n'));
        let numRegex = /\d+/g;
        let sum = 0;
        for (section of sections) {
            let a = section[0].split(" ").splice(2).map(x => parseInt(x.match(numRegex)));
            let b = section[1].split(" ").splice(2).map(x => parseInt(x.match(numRegex)));
            let o = section[2].split(" ").splice(1).map(x => parseInt(x.match(numRegex)));
            let answer = solveLinearEquations(a, b, o, 'part1');
            if (Number.isInteger(answer['x']) && Number.isInteger(answer['y'])) {
                sum += (3 * answer['x']) + answer['y'];
            }
        }
        return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let sections = data.split('\r\n\r\n').map(x => x.split('\r\n'));
        let numRegex = /\d+/g;
        let sum = 0;
        for (section of sections) {
            let a = section[0].split(" ").splice(2).map(x => parseInt(x.match(numRegex)));
            let b = section[1].split(" ").splice(2).map(x => parseInt(x.match(numRegex)));
            let o = section[2].split(" ").splice(1).map(x => parseInt(x.match(numRegex)));
            let addition = 10000000000000;
            o[0] = addition + o[0];
            o[1] = addition + o[1];
            let answer = solveLinearEquations(a, b, o, 'part2');
            let validA = a[0] * answer['x'] + b[0] * answer['y'] === o[0];
            let validB = a[1] * answer['x'] + b[1] * answer['y'] === o[1];
            if (validA && validB) {
                sum += (3 * answer['x']) + answer['y'];
            }
        }
        return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

console.log(problem1())
console.log(problem2())
