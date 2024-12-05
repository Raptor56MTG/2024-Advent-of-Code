const { p } = require('../FastPrint/print.js');
const fs = require('fs');

function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let rules = data.split('\r\n\r\n')[0].split('\r\n').map(x => x.split('|').map(x => parseInt(x)));
        let pages = data.split('\r\n\r\n')[1].split('\r\n').map(x => x.split(',').map(x => parseInt(x)));
        let sum = 0;
        for (page of pages) {
            let valid = true;
            for (rule of rules) {
                if (page.indexOf(rule[0]) !== -1 && page.indexOf(rule[1]) !== -1 && 
                    page.indexOf(rule[0]) > page.indexOf(rule[1])) {
                        valid = false; 
                }
            }
            sum += valid ? page[Math.floor(page.length / 2)] : 0;
        }
    return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let rules = data.split('\r\n\r\n')[0].split('\r\n').map(x => x.split('|').map(x => parseInt(x)));
        let pages = data.split('\r\n\r\n')[1].split('\r\n').map(x => x.split(',').map(x => parseInt(x)));
        let sum = 0;
        let invalid_pages = []
        // get invalid pages
        for (page of pages) {
            let valid = true;
            for (rule of rules) {
                if (page.indexOf(rule[0]) !== -1 && page.indexOf(rule[1]) !== -1 && 
                    page.indexOf(rule[0]) > page.indexOf(rule[1])) {
                        valid = false; 
                }
            }
            if (!valid) {
                invalid_pages.push(page);
            }
        }
        // swap until fixed.
        for (page of invalid_pages) {
            let all_rules = new Array(rules.length).fill(false);
            let fixed = false;
            while(!fixed) {
                for (let i = 0; i < rules.length; i++) {
                    if (page.indexOf(rules[i][0]) !== -1 && page.indexOf(rules[i][1]) !== -1) {
                        if (page.indexOf(rules[i][0]) < page.indexOf(rules[i][1])) {
                            all_rules[i] = true;
                        } else {
                            let a = page.indexOf(rules[i][0]);
                            let b = page.indexOf(rules[i][1]);
                            let val = page[a];
                            page[a] = page[b];
                            page[b] = val;
                            all_rules[i] = false;
                        }
                    } else {
                        all_rules[i] = true;
                    }
                }
                fixed = all_rules.every(value => value === true)
            }
            sum += page[Math.floor(page.length / 2)];
        }
    return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

console.log(problem1())
console.log(problem2())
