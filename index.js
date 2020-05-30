const fs = require("fs");

function readMaze() {
    var maze = [];
    fs.readFile("maze.txt", "utf-8", (err, data) => {
        if (err) throw err;

        // Converting Raw Buffer to text
        // data using tostring function.
        var array = [];
        for (var i = 0; i < data.length; i++){
            if ( data.charAt(i) == "\n" ) {
                maze.push(array);
                array = [];
            } else {
                if (data.charAt(i) != "\r") {
                    array.push(data.charAt(i));
                }
            }
        }
        calculateMaze(maze);
    });
}

function calculateMaze(s) {
    console.log(s);
}

readMaze();
