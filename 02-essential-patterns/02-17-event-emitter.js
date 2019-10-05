const EventEmitter = require('events');
const fs = require('fs');

class FindPattern extends EventEmitter {
  constructor(fileNames, pattern) {
    super();
    this.fileNames = fileNames || [];
    this.pattern = pattern;
  }

  addFile(name) {
    this.fileNames.push(name);
    return this;
  }

  readFiles() {
    const { fileNames, pattern } = this;

    fileNames.forEach(name => {
      fs.readFile(name, 'utf8', (err, file) => {
        if (err) {
          return this.emit('error', name, err);
        }

        console.log('Emitting read');
        this.emit('read', name);
        console.log('Finished emitting read');

        let matches = file.match(pattern);
        if (matches) {
          matches.forEach(match => this.emit('found', file, match));
        }
      });
    });

    return this;
  }
}

new FindPattern(null, /\w+/)
  .addFile('data.txt')
  .readFiles()
  .on('read', fileName => console.log('Read the file:', fileName))
  .on('found', (fileName, match) => console.log('Found a match:', match))
  .on('error', (fileName, err) => console.log('Error: Failed to read a file:', fileName));
  // Важно: всегда добавляйте обработчик ошибок!
