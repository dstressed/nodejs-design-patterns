const fs = require('fs');
const cache = {};

function consistentReadSync(filename) {
  if(cache[filename]) {
    return cache[filename]; // При синхронном подходе предпочтительнее использовать Прямой стиль.
  } else {
    cache[filename] = fs.readFileSync(filename, 'utf8'); // Синхронное чтение файла
    return cache[filename];
  }
}

function createFileReader(filename) {
  const listeners = [];
  const value = consistentReadSync(filename);

  listeners.forEach(listener => listener(value));

  return {
    onDataReady: listener => listeners.push(listener)
  };
}

const reader1 = createFileReader('data.txt');

reader1.onDataReady((data) => {
  console.log('First call data: ' + data);

  const reader2 = createFileReader('data.txt');
  reader2.onDataReady( (data) => {
    console.log('Second call data:', data);
  });
});
