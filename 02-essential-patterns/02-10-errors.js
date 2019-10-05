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

process.on('uncaughtException', (err) => { // Использутся для чистки данных или логирования.
  console.error('This will catch at last the JSON parsing exception: ' + err.message);
  // При перехвате ошибки при помощи события uncaughtException необходимо завершить приложения (зачастую с кодом 1)
  // для предотвращения дальнейшей некоректной работы приложения, о чем и свидетельствует неперехваченная ошибка.
  process.exit(1);
});


function loadModule(filename, module, require) {
  const wrappedSrc=`(function(module, exports, require) {
         ${fs.readFileSync(filename, 'utf8')}
       })(module, module.exports, require);`;
  eval(wrappedSrc);
}
