const fs = require('fs');

try {
    const data = fs.readFileSync('problem.txt', 'utf8');

} catch (err) {
    console.error('Error:', err);
}
