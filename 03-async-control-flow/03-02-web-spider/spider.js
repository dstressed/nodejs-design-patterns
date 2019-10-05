'use strict';

const fs = require('fs');
const path = require('path');
const request = require('request');
const mkdirp = require('mkdirp');
const utilities = require('./utilities');

function writeFile(filename, body, callback) {
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      return callback(err);
    }

    fs.writeFile(filename, body, callback);
  });
}

function loadFile(url, filename, callback) {
  request(url, (err, response, body) => {
    if (err) {
      return callback(err);
    }

    writeFile(filename, body, (err) =>{
      if (err) {
        return callback(err);
      }

      callback(null, filename, true);
    });
  });
}

function spider(url, callback) {
  const filename = utilities.urlToFilename(url);

  fs.readFile(filename, (err, file) => {
    if (!err) {
      return callback(null, filename, false);
    }

    loadFile(url, filename, callback)
  });
}

spider(process.argv[2] || 'https://www.example.com', (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Spider: Completed downloading '${filename}.'`);
  } else {
    console.log(`Spider: Already downloaded '${filename}'.`);
  }
});

// node spider(.js?) https://www.example.com

// Исправления:
// 1. Убрать блок if ... else (добавить return).
// 2. Вынести логику записи файла в отдельную функцию
// 3. Вынести логику отправления запроса в отдельную функцию
