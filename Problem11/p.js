const { p } = require('../FastPrint/print.js');
const fs = require('fs');

function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let stones = data.split(" ").map(x => parseInt(x));
        
        iterations = 25;
        for (let i = 0; i < iterations; i++) {
            let updated = [];
            for (let j = 0; j < stones.length; j++) {
                if (stones[j] === 0) {
                    updated.push(1);
                }
                else if (`${stones[j]}`.length % 2 === 0) {
                    let stringNum = `${stones[j]}`;
                    let term1 = parseInt(stringNum.slice(0, stringNum.length / 2));
                    let term2 = parseInt(stringNum.slice(stringNum.length / 2));
                    updated.push(term1);
                    updated.push(term2);
                }
                else {
                    updated.push(stones[j] * 2024);
                }
            }
            stones = structuredClone(updated);
        }
        return stones.length;
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let stones = data.split(" ").map(x => parseInt(x));
        let cache = {};
        iterations = 25;
        for (let i = 0; i < iterations; i++) {
            let updated = [];
            console.log(i);
            // console.log(cache);
            for (let j = 0; j < stones.length; j++) {
                if (cache[stones[j]] !== null) {
                    for (term in cache[stones[j]]) {
                        updated.push(term);
                    }
                }
                if (stones[j] === 0) {
                    updated.push(1);
                    cache[stones[j]] = [1];
                }
                else if (`${stones[j]}`.length % 2 === 0) {
                    let stringNum = `${stones[j]}`;
                    let term1 = parseInt(stringNum.slice(0, stringNum.length / 2));
                    let term2 = parseInt(stringNum.slice(stringNum.length / 2));
                    cache[stones[j]] = [term1, term2];
                    updated.push(term1);
                    updated.push(term2);
                }
                else {
                    cache[stones[j]] = [stones[j] * 2024];
                    updated.push(stones[j] * 2024);
                }
            }
            stones = structuredClone(updated);
        }
        return stones.length;
    } catch (err) {
        console.error('Error:', err);
    }
}

console.log(problem1())
console.log(problem2())
