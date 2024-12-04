const { p } = require('../FastPrint/print.js');
const fs = require('fs');

function rotate90(array) {
    rotated = []
    for (let i = 0; i < array[0].length; i++) {
        let row = [];
        for(let j = 0; j < array.length; j++) {
            row.push(array[j][i]);
        }
        rotated.push(row.join(''));
    }
    return rotated;
}

function rightDiagonal(array) {
    rotated = []
    // ***
    // **
    // *
    for (let i = 0; i < array.length; i++) {
        let row = [];
        let x = 0;
        let y = i;
        while (y >= 0) {
            row.push(array[y][x]);
            y -= 1;
            x += 1;
        }
        rotated.push(row.join(''));
    }

    // *
    //**
    for (let i = 1; i < array[0].length; i++) {
        let row = [];
        let x = i;
        let y = array.length - 1;
        while (x < array[0].length) {
            row.push(array[y][x]);
            y -= 1;
            x += 1;
        }
        rotated.push(row.join(''));
    }
    return rotated;
}

function leftDiagonal(array) {
    rotated = []
    // ***
    //  **
    //   *
    for (let i = array[0].length - 1; i >= 0; i--) {
        let row = [];
        let x = i;
        let y = 0;
        while (x < array[0].length) {
            row.push(array[y][x]);
            y += 1;
            x += 1;
        }
        rotated.push(row.join(''));
    }

    // *
    // **
    for (let i = 1; i < array.length; i++) {
        let row = [];
        let x = 0;
        let y = i;
        while (y < array.length) {
            row.push(array[y][x]);
            y += 1;
            x += 1;
        }
        rotated.push(row.join(''));
    }
    return rotated;
}

function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let array = data.split("\r\n");
        //overlaps are missed by combined regex
        const regex1 = /XMAS/g;
        const regex2 = /SAMX/g;
        let h1 = data.match(regex1);
        let h2 = data.match(regex2);
        let dataRotated = rotate90(array).join('\r\n');
        let v1 = dataRotated.match(regex1);
        let v2 = dataRotated.match(regex2);
        let dataRightDiagonal = rightDiagonal(array).join('\r\n');
        let dr1 = dataRightDiagonal.match(regex1);
        let dr2 = dataRightDiagonal.match(regex2);
        let dataLeftDiagonal = leftDiagonal(array).join('\r\n');
        let dl1 = dataLeftDiagonal.match(regex1);
        let dl2 = dataLeftDiagonal.match(regex2);
        let sum = h1.length + h2.length + v1.length + v2.length
                  + dr1.length + dr2.length + dl1.length + dl2.length;
        return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let array = data.split("\r\n").map(x=> x.split(""));
        let sum = 0;
        for (let i = 0; i < array[0].length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i][j] === 'A' && i - 1 >= 0 && i + 1 < array[0].length && j - 1 >= 0 && j + 1 < array.length) {
                    let terms = [array[i - 1][j + 1],
                                    array[i - 1][j - 1],
                                    array[i + 1][j + 1], 
                                    array[i + 1][j - 1]];
                    let valid = array[i - 1][j + 1] !== array[i + 1][j - 1] && array[i - 1][j - 1] !== array[i + 1][j + 1];
                    let m_count = 0;
                    let s_count = 0;
                    for (term of terms) {
                        if (term === 'M') {
                            m_count += 1;
                        }
                        if (term === 'S') {
                            s_count += 1;
                        }
                    }
                    if (valid && m_count === 2 && s_count === 2) {
                        sum += 1;
                    }
                }
            }
        }  
        return sum;            
    } catch (err) {
        console.error('Error:', err);
    }
}

// console.log(problem1())
console.log(problem2())
