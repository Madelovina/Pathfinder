const fs = require("fs");
var astar = require("./src/dijkstra.js");

function readMaze() {
    var maze = [];
    fs.readFile("maze.txt", "utf-8", (err, data) => {
        // converting file to string data
        if (err) throw err;

        var array = [];
        for (var i = 0; i < data.length; i++) {
            if (data.charAt(i) == "\n") {
                maze.push(array);
                array = [];
            } else {
                if (data.charAt(i) != "\r") {
                    array.push(data.charAt(i));
                }
            }
        }
        astar.data.dijkstraCalculateMaze(maze, { x: 1, y: 0 }, { x: 11, y: 5 }); // calculate best path
    });
}

readMaze();
