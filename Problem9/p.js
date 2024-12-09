const { p } = require('../FastPrint/print.js');
const fs = require('fs');


function problem1() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let fileData = data.split('').map(x => parseInt(x));
        let isFile = true;
        let diskMap = [];
        for (let i = 0; i < fileData.length; i++) {
            if (isFile) {
                let id = i / 2;
                let file = Array(fileData[i]).fill(id);
                diskMap.push(...file);
                isFile = false;
            } else {
                let freeSpace = Array(fileData[i] + 1).join('.').split('');
                diskMap.push(...freeSpace);
                isFile = true; 
            }
        }

        let leftPointer = 0;
        let rightPointer = diskMap.length - 1;
        let leftValid = false;
        let rightValid = false;

        while (leftPointer != rightPointer) {
            // queue left pointer
            if (diskMap[leftPointer] === '.') {
                leftValid = true;
            } else {
                leftPointer += 1;
            }
            // queue right pointer
            if (diskMap[rightPointer] !== '.') {
                rightValid = true;
            } else {
                rightPointer -= 1;
            }
            if (leftValid && rightValid) {
                // swap data
                let left  = diskMap[leftPointer];
                diskMap[leftPointer] = diskMap[rightPointer];
                diskMap[rightPointer] = left;
                leftPointer += 1;
                rightPointer -= 1;
                leftValid = false;
                rightValid = false;
            }
        }

        // remove empty space
        diskMap = diskMap.filter((value) => value !== '.');

        let sum = 0;
        for (let i = 0; i < diskMap.length; i++) {
            sum += diskMap[i] * i;
        }
        return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

function problem2() {
    try {
        const data = fs.readFileSync('problem.txt', 'utf8');
        let fileData = data.split('').map(x => parseInt(x));
        let isFile = true;
        let diskMap = [];
        for (let i = 0; i < fileData.length; i++) {
            if (isFile) {
                if (fileData[i] !== 0) {
                    let id = i / 2;
                    let file = Array(fileData[i] + 1).join(`${id}`);
                    diskMap.push(file);
                }
                isFile = false;
            } else {
                if (fileData[i] !== 0) {
                    let freeSpace = Array(fileData[i] + 1).join('.');
                    diskMap.push(freeSpace);
                }
                isFile = true;
            }
        }
        console.log(diskMap);
        for (let i = 0; i < diskMap.length; i++) {
            if (diskMap[i].includes('.')) {
                // get empty space
                let emptySpace = diskMap[i];
                rightPointer = diskMap.length - 1;
                let freeSpace = true; 
                while (rightPointer != i && freeSpace) {
                    if (!diskMap[rightPointer].includes('.')) {
                        file = diskMap[rightPointer];
                        if (file.length <= emptySpace.length) {
                            // move over file and free space.
                            diskMap[i] = file;
                            let freedSpace = Array(file.length + 1).join('.');
                            diskMap[rightPointer] = freedSpace;
                            // inject remaining space if there is any left.
                            let remainingSpace = Array(emptySpace.length - file.length + 1).join('.');
                            // if there is still empty space, inject it in the spot over.
                            if (remainingSpace !== '') {
                                let insertIndex = i + 1;
                                diskMap.splice(insertIndex, 0, remainingSpace);
                            }
                            // end the loop and look for the next free space.
                            freeSpace = false;
                        } else {
                            rightPointer -=1;
                        }
                    } else {
                        // continue to the next location
                        rightPointer -= 1;
                    }
                }
                console.log(diskMap)
            }
        }
        console.log(diskMap);

        // // remove empty space
        // diskMap = diskMap.filter((value) => value !== '.');

        // let sum = 0;
        // for (let i = 0; i < diskMap.length; i++) {
        //     sum += diskMap[i] * i;
        // }
        // return sum;
    } catch (err) {
        console.error('Error:', err);
    }
}

// console.log(problem1())
console.log(problem2())
