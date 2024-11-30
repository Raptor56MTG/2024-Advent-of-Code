// import file system library
const fs = require('fs');

// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
try {
    const data = fs.readFileSync('problem.txt', 'utf8');
    let result = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] === '(') {
            result += 1;
        }
        if (data[i] === ')') {
            result -= 1;
        }
        if (result == -1) {
            console.log(i + 1);
        }
    }
} catch (err) {
    console.error('Error:', err);
}
