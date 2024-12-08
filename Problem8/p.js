const { p } = require('../FastPrint/print.js');
const fs = require('fs');


function getAntennas(grid, antennas) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] != '.') {
                if (antennas.has(grid[i][j])) {
                    antennas.get(grid[i][j]).push([i, j]);
                }
                else {
                    antennas.set(grid[i][j], [[i, j]]);
                }
            }
        }
    }
    return antennas;
}

function inBounds(x, y, grid) {
    return x >= 0 && y >= 0 && x < grid[0].length && y < grid.length;
}

function getAntinodes(a, b, grid) {
    let points = [];
    let x_diff = Math.abs(a[0] - b[0]);
    let y_diff = Math.abs(a[1] - b[1]);
    let aX = a[0] > b[0] ? a[0] + x_diff : a[0] - x_diff;
    let aY = a[1] > b[1] ? a[1] + y_diff : a[1] - y_diff;
    let bX = b[0] > a[0] ? b[0] + x_diff : b[0] - x_diff;
    let bY = b[1] > a[1] ? b[1] + y_diff : b[1] - y_diff;
    if (inBounds(aX, aY, grid)) {
        points.push([aX, aY]);
    }
    if (inBounds(bX, bY, grid)) {
        points.push([bX, bY]);
    }
    return points;
}

function getAllAntinodes(point1, point2, grid) { 
    let points = [];
    //y = mx + b
    let m = (point1[1] - point2[1]) / (point1[0] - point2[0])
    // b = y - mx
    let b = point1[1] - (m * point1[0])

    for (let i = 0; i < grid[0].length; i++) {
        let x = i;
        let y = (m * x) + b;
        // floating point precision errors are hell.
        y = Math.round(y * 1e10) / 1e10;
        if (inBounds(x, y, grid) && Number.isInteger(y)) {
            points.push([x, y]);
        }
    }
    return points;
}

function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let grid = data.split('\r\n').map(x => x.split(""));
        let antennas = new Map();
        antennas = getAntennas(grid, antennas);
        let antinodes = [];
        for (const antenna of antennas.values()) {
            for (let i = 0; i < antenna.length - 1; i++) {
                for (j = i + 1; j < antenna.length; j++) {
                    antinodes.push(...getAntinodes(antenna[i], antenna[j], grid));
                }
            }
        }
        uniqueNodes = Array.from(new Map(antinodes.map((p) => [p.join(), p])).values());
        return uniqueNodes.length;
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let grid = data.split('\r\n').map(x => x.split(""));
        let antennas = new Map();
        antennas = getAntennas(grid, antennas);
        let antinodes = [];
        for (const antenna of antennas.values()) {
            for (let i = 0; i < antenna.length - 1; i++) {
                for (j = i + 1; j < antenna.length; j++) {
                    antinodes.push(...getAllAntinodes(antenna[i], antenna[j], grid));
                }
            }
        }
        uniqueNodes = Array.from(new Map(antinodes.map((p) => [p.join(), p])).values());
        return uniqueNodes.length;
    } catch (err) {
        console.error('Error:', err);
    }
}

console.log(problem1())
console.log(problem2())
