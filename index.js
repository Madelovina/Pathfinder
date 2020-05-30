const fs = require("fs");

function readMaze() {
    var maze = [];
    fs.readFile("maze.txt", "utf-8", (err, data) => {
        // converting file to string data
        if (err) throw err;

        var array = [];
        for (var i = 0; i < data.length; i++){
            // putting string into an array to represent maze
            if ( data.charAt(i) == "\n" || i == data.length - 1) {
                maze.push(array);
                array = [];
            } else {
                    if ( data.charAt[i] != "\r" ) {
                    array.push(data.charAt(i));
                
                }
            }
        }
        calculateMaze(maze, {x: 1, y:0}, {x: 11, y:5}); // calculate best path
    });
}

function calculateMaze(mArray, start, end) {
    console.log(mArray);
    var open = []; // creating empty array of pre-evaluated positions
    var closed = [start]; // creating empty array of evaluated positions
    var vertices = [start];
    var current = start;

    for ( var i = 0; i < mArray.length; i++ ) {
        // determining the positions to be evaluated
        for ( var k = 0; k < mArray[i].length; k++ ) {
            if ( (mArray[i])[k] == 0 ) {
                if ( !(k == start.x && i == start.y) ) {
                    // alternatively if we are specifying that start is
                    // always on top, can just start for loop at x and y of start.
                    var g_score = Math.round(Math.sqrt((k - start.x)**2 + (i - start.y)**2));
                    var h_score = Math.round(Math.sqrt((k - end.x)**2 + (i - end.y)**2));
                    var pos = {
                        x: k,
                        y: i,
                        f_score: g_score + h_score
                    }
                    open.push(pos);
                }
            }
        }
    }

    while (!samePos(current, end)) {
        var neighbors = getNeighbors(current, open);
        if (neighbors.length == 0) {
            current = vertices.pop();
        }
        var target = lowestCost(neighbors);
        if (isVertex(current)) {
            vertices.push(target);
        }

        closeNode(target, open, closed);
        current = target;

    }
    
    

    console.log("open", open);
    console.log("neighbor", getNeighbors({ x: 3, y:2 }, open));
    console.log("lowest cost", lowestCost(getNeighbors({ x: 3, y:2 }, open)));
}

function getNeighbors(current, open) {
    var neighbors = [];
    open.forEach(pos => {
        if (Math.abs(current.x - pos.x) <= 1 && Math.abs(current.y - pos.y) <= 1 && !samePos(current, pos)) {
            neighbors.push(pos);
        }
    });

    return neighbors;
}

function lowestCost(array) {
    var c = array.pop();
    array.forEach(pos => {
        if (pos.f_score < c.f_score) {
            c = pos;
        }
    });

    return c;
}

function samePos(a, b) {
    if (a.x == b.x && a.y == b.y) {
        return true;
    }
    return false;
}

function isVertex(neighbors) {
    if (neighbors.length > 1) {
        return true;
    }
    return false;
}

function closeNode(node, open, close) {
    open.splice(open.indexOf(node),1);
    close.push(node);
}
readMaze();
