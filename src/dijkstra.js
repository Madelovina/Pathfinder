const TinyQueue = require("tinyqueue");

var methods = {
    dijkstraCalculateMaze: function (maze, start, end) {
        var open = new TinyQueue(
            [
                new Node(
                    start.x,
                    start.y,
                    0,
                    new Node(start.x, start.y, 0, { x: -1, y: -1 })
                ),
            ],
            function (a, b) {
                return a.weight - b.weight;
            }
        ); // create empty array of pre-evaluated positions
        var closed = new TinyQueue([], function (a, b) {
            return a.weight - b.weight;
        }); // create array of evaluated positions

        var current = open.peek();
        while (!(current.x == end.x && current.y == end.y)) {
            current = open.peek();
            open.pop();
            var neighbors = getNeighbors(maze, current);
            for (var i = 0; i < neighbors.length; i++) {
                var node = new Node(neighbors[i].x, neighbors[i].y, 1, current);
                if (!(pqContains(open, node) || pqContains(closed, node)))
                    open.push(node);
            }
            closed.push(current);
        }

        var path = [];
        var step = pqGet(closed, end.x, end.y);
        while (step.x != start.x) {
            path.push(step);
            step = pqGet(closed, step.parent.x, step.parent.y);
        }

        var data = "";

        for (var i = 0; i < maze.length; i++) {
            for (var j = 0; j < maze[0].length; j++)
                if (i == start.x && j == start.y) data += "S";
                else if (i == end.x && j == end.y) data += "E";
                else if (containArray(path, i, j)) data += "P";
                else data += maze[i][j];
            data += "\n";
        }

        return data;
    },
};

function getNeighbors(maze, current) {
    var neighbors = [];
    var final = [];

    // Adds the node that is above, to the right, below, and to the left
    neighbors.push({ x: current.x, y: current.y - 1 });
    neighbors.push({ x: current.x + 1, y: current.y });
    neighbors.push({ x: current.x - 1, y: current.y });
    neighbors.push({ x: current.x, y: current.y + 1 });

    for (var i = 0; i < neighbors.length; i++) {
        if (
            !(neighbors[i].x < 0 || neighbors[i].x >= maze.length) &&
            !(neighbors[i].y < 0 || neighbors[i].y >= maze[0].length) &&
            maze[neighbors[i].x][neighbors[i].y] == 0
        )
            final.push(neighbors[i]);
    }

    return final;
}

function pqContains(pq, node) {
    var items = pq.data;
    for (var i = 0; i < items.length; i++) {
        if (items[i].compare(node)) return true;
    }
    return false;
}

function pqGet(pq, x, y) {
    var items = pq.data;
    for (var i = 0; i < items.length; i++) {
        if (items[i].x == x && items[i].y == y) return items[i];
    }
}

function containArray(arr, x, y) {
    for (var i = 0; i < arr.length; i++)
        if (arr[i].x == x && arr[i].y == y) return true;
    return false;
}

class Node {
    constructor(X, Y, W, P) {
        this.x = X;
        this.y = Y;
        this.weight = W;
        this.parent = P;
    }

    compare(node) {
        if (
            this.x == node.x &&
            this.y == node.y // &&
            // this.weight == node.weight &&
            // this.parent.x == node.parent.x &&
            // this.parent.y == node.parent.y
        )
            return true;
        return false;
    }
}

exports.data = methods;
