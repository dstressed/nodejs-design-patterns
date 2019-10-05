const EventEmitter = require('events');
const fs = require('fs');

function findPattern(fileNames, pattern) {
  const emitter = new EventEmitter();

  fileNames.forEach((name) => {
    fs.readFileSync(name, 'utf8', function(err, file) {
      if (err) {
        return emitter.emit('error', name, err);
      }

      emitter.emit('read', name);

      let matches = file.match(pattern);
      if (matches) {
        matches.forEach(match => emitter.emit('found', file, match));
      }
    });
  });

  return emitter;
}

findPattern(['data.txt'], /\w+/)
  .on('read', fileName => console.log('Read the file:', fileName))
  .on('found', (fileName, match) => console.log('Found a match:', match))
  .on('error', (fileName, err) => console.log('Error: Failed to read a file:', fileName));
  // Важно: всегда добавляйте обработчик ошибок!

// Вопрос: сработают ли обработчики, если чтение закончится раньше?
