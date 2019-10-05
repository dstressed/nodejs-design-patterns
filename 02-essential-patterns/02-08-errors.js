const fs = require('fs');

function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => { // В коллбэках ошибка всегда передается первым аргументом.
    let parsed;

    if (err) {
      return callback(err);
    }

    try {
      parsed = JSON.parse(data);
    } catch (err) {
      return callback(err);
    }

    callback(null, parsed);
  });
}

readJSON('data.txt', (err, data) => console.log(err, data));
