const TinyQueue = require("tinyqueue");

var methods = {
    dijkstraCalculateMaze: function (maze, start, end) {
        var open = new TinyQueue(
            new Node(start.x, start.y, 0, start),
            function (a, b) {
                return a.weight - b.weight;
            }
        ); // create empty array of pre-evaluated positions
        var closed = [new Node(start.x, start.y, 0, start)]; // create array of evaluated positions
        open.pop(); // Pops the temporary node

        var current = start;
        while (current != end) {
            var neighbors = getNeighbors(maze, current);
            for (var i = 0; i < neighbors.length; i++) {
                var node = new Node(neighbors[i].x, neighbors[i].y, 1, current);
                //if()
            }
        }
    },
};

function getNeighbors(maze, current) {
    var neighbors = [];

    // Adds the node that is above, to the right, below, and to the left
    neighbors.push({ x: current.x, y: current.y - 1 });
    neighbors.push({ x: current.x + 1, y: current.y });
    neighbors.push({ x: current.x - 1, y: current.y });
    neighbors.push({ x: current.x, y: current.y + 1 });

    for (var i = 0; i < neighbors.length; i++)
        if (neighbors[i].x < 0 || neighbors[i].x >= maze.length) {
            neighbors.splice(i, 1);
            i--;
        } else if (neighbors[i].y < 0 || neighbors[i].y >= maze[0].length) {
            neighbors.splice(i, 1);
            i--;
        } else if (maze[neighbors[i].x][neighbors[i].y] != 0) {
            neighbors.splice(i, 1);
            i--;
        }

    return neighbors;
}

function pqContains(pq, node) {
    var items = pq.data;
    for(var i = 0;i<items.length;i++){
        if()
    }
}

class Node {
    constructor(X, Y, W, P) {
        this.x = X;
        this.y = Y;
        this.weight = W;
        this.parent = P;
    }
}

exports.data = methods;
