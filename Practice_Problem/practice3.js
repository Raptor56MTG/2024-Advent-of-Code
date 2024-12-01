// import file system library
const fs = require('fs');

// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
try {
    const data = fs.readFileSync('problem2.txt', 'utf8');
    t = data.split("\r\n").map(x => x !== "" ? parseInt(x) : "|");
    let totals = [];
    let sum = 0;
    for (x of t) {
        if (x === '|') {
            totals.push(sum);
            sum = 0;
        }
        else {
            sum += x;
        }
    }
    console.log(Math.max(...totals));

} catch (err) {
    console.error('Error:', err);
}
