const { p } = require('../FastPrint/print.js');
const fs = require('fs');


function move(direction, x, y) {
    const moves = {"N": [0, -1],
                   "S": [0, 1],
                   "E": [1, 0],
                   "W": [-1, 0]};
    return [x + moves[direction][0],
            y + moves[direction][1]];
}

function turn(direction) {
    const turns = {"N": "E",
                   "E": "S",
                   "S": "W",
                   "W": "N"};
    return turns[direction];
}

function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let maze = data.split('\r\n').map(x => x.split(''));
        let y = maze.findIndex(row => row.includes('^'));
        let x = maze[y].indexOf('^');
        let direction = 'N';
        let locations = new Set();
        while (true) {
            locations.add(`${y},${x}`);
            [x2, y2] = move(direction, x, y);
            if (x2 < 0 || y2 < 0 || x2 >= maze[0].length || y2 >= maze.length) {
                break;
            }
            if (maze[y2][x2] === '#') {
                direction = turn(direction);
            } else {
                x = x2;
                y = y2;
            }
        }
        return locations.size;
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let maze = data.split('\r\n').map(x => x.split(''));
        let obstacles = 0;
        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[0].length; j++) {
                let y = maze.findIndex(row => row.includes('^'));
                let x = maze[y].indexOf('^');
                let direction = 'N';
                let locations = new Set();
                let copy = structuredClone(maze);
                copy[i][j] = '#';
                while (true) {
                    [x2, y2] = move(direction, x, y);
                    if (x2 < 0 || y2 < 0 || x2 >= copy[0].length || y2 >= copy.length) {
                        loop = false;
                        break;
                    }
                    else if (copy[y2][x2] === '#') {
                        direction = turn(direction);
                    } else {
                        x = x2;
                        y = y2;
                        let previousSize = locations.size;
                        locations.add(`${y},${x},${direction}`);
                        let updatedSize = locations.size;
                        if (previousSize === updatedSize) {
                            obstacles += 1;
                            break;
                        }
                    }
                }
            }
        }
        return obstacles;
    } catch (err) {
        console.error('Error:', err);
    }
}

console.log(problem1())
console.log(problem2())
