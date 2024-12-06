// this is a holder of failed ideas
// and failed attempts. There might be
// something here, but i have resided to a sad brute force approach.
// I will spend more time thinking for a better solution, but for now.
// I will take a gold star. Keeping these as brainstorming fodder.


function updatePath(direction, maze, x, y) {
    if (maze[y][x] === '.' || maze[y][x] === '^') {
        return direction;
    }
    else {
        return maze[y][x] + direction
    }
}

function createPath(direction, maze, x, y) {
    while (true) {
        maze[y][x] = updatePath(direction, maze, x, y);
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
    return maze;
}

function displayMaze(maze) {
    let copy = structuredClone(maze);
    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy[0].length; j++) {
            if (copy[i][j].length != 2) {
                copy[i][j] = ` ${copy[i][j]}`
            }
        }
    }
    console.log(copy.map(x => x.join(" ")).join("\r\n"));
}

// (0, 0) (0, 1) (0, 2) (0, 3)
// (1, 0) (1, 1) (1, 2) (1, 3)
// (2, 0) (2, 1) (2, 2) (2, 3)
// (3, 0) (3, 1) (3, 2) (3, 3)

function checkForObstacles(direction, maze, x, y) {
    // north check
    if (direction === 'N') {
        if (y - 1 < 0) {
            return 0;
        }
        row = maze[y - 1].slice(x + 1);
        for (term of row) {
            if (term === '#') {
                return 0;
            }
            if (term.includes('E')) {
                return 1;
            }
        }
        return 0;
    }

    // south check
    if (direction === 'S') {
        if (y + 1 >= maze.length) {
            return 0;
        }
        console.log(maze[y + 1], y);
        row = maze[y + 1].slice(0, x).reverse();
        for (term of row) {
            if (term === '#') {
                return 0;
            }
            if (term.includes('W')) {
                console.log("South");
                return 1;
            }
        }
        return 0;
    }
    return 0;
}


function oldproblem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let maze = data.split('\r\n').map(x => x.split(''));
        let y = maze.findIndex(row => row.includes('^'));
        let x = maze[y].indexOf('^');
        let direction = 'N';
        let obstacles = 0;
        // create the path that will be walked.
        maze = createPath(direction, maze, x, y);
        // trace the path again and look for loops.
        while (true) {
            obstacles += checkForObstacles(direction, maze, x, y);
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
        displayMaze(maze);
        return obstacles;
    } catch (err) {
        console.error('Error:', err);
    }
}


function displayMaze(maze) {
    let copy = structuredClone(maze);
    for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy[0].length; j++) {
            if (copy[i][j].length != 2) {
                copy[i][j] = ` ${copy[i][j]}`
            }
        }
    }
    console.log(copy.map(x => x.join(" ")).join("\r\n"));
}