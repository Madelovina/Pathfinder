const fs = require("fs");
const dijkstra = require("./src/dijkstra.js");
const astar = require("./src/astar.js");
const generator = require("./src/kruskal.js");

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
        maze.push(array);

        var test = function (err) {
            throw err;
        };

        fs.writeFile(
            "path.txt",
            dijkstra.data.dijkstraCalculateMaze(
                maze,
                { x: 0, y: 1 },
                { x: 50, y: 49 },
                astar.data.getWeight
            ),
            (err) => test
        );
        // calculate best path
    });
}

function generateMaze() {
    var test = function (err) {
        throw err;
    };

    fs.writeFile("maze.txt", generator.data.genMaze(), (err) => test);
}

generateMaze();
readMaze();
