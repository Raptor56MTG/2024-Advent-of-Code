// import file system library
const fs = require('fs');

// This file will contain tricks I googled after solving the problem.
// I want to get better at understanding the built in array tools in Javascript.
// This is similar to the built in tricks I might use in python to solve this problem.


// TRICK 1: better for loop iteration.
try {
    const data = fs.readFileSync('problem.txt', 'utf8');
    let result = 0;
    // neat iteration for loop trick
    // faster in these settings
    for (val of data) {
        if (val === '(') {
            result += 1;
        }
        if (val === ')') {
            result -= 1;
        }
    }
    console.log(result);
} catch (err) {
    console.error('Error:', err);
}


// TRICK 2: String Array Spread Syntax, Map, and Reduce.
try {
    const data = fs.readFileSync('problem.txt', 'utf8');
    // spread syntax to make string array
    let array = [...data];
    // use map to convert array of strings to array of 1 and -1. 0 is the edge case.
    array = array.map(c => c === '(' ? 1 : c === ')' ? -1 : 0);
    // use reduce to act as a 'sum' and sum the array to get our answer.
    let result = array.reduce((result, term) => result + term, 0);
    console.log(result);
} catch (err) {
    console.error('Error:', err);
}
