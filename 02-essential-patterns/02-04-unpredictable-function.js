const fs = require('fs');
const cache = {};

function inconsistentRead(filename, callback) {
  if (cache[filename]) {
    callback(cache[filename]); // Выполниться синхронно.
  } else {
    fs.readFile(filename, 'utf8', (err, data) => { // Выполниться асинхронно.
      cache[filename] = data;
      callback(data);
    });
  }
}

inconsistentRead('data.txt', console.log);
