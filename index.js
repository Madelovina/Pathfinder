const fs = require("fs");

function readMaze() {
    fs.readFile("maze.txt", "utf-8", (err, data) => {
        if (err) throw err;

        // Converting Raw Buffer to text
        // data using tostring function.
        console.log(data);
    });
}

readMaze();
