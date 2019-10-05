const fs = require('fs');

function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    callback(null, JSON.parse(data));
  });
}

try {
  readJSON('data.txt', (err, data) => console.log(err, data));
} catch (err) {
  console.log(err);
}
