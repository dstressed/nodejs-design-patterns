'use strict';

const fs = require('fs');
const path = require('path');
const request = require('request');
const mkdirp = require('mkdirp');
const utilities = require('./utilities');

function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      return callback(err);
    }

    fs.writeFile(filename, contents, callback);
  });
}

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  request(url, (err, response, body) => {
    if (err) {
      return callback(err);
    }

    saveFile(filename, body, err => {
      if (err) {
        return callback(err);
      }

      console.log(`Downloaded and saved: ${url}`);
      callback(null, body);
    });
  });
}

function spider(url, callback) {
  const filename = utilities.urlToFilename(url);

  fs.readFile(filename, (err) => {
    if (!err) {
      return callback(null, filename, false);
    }

    download(url, filename, (err, body) => {
      if (err) {
        return callback(err);
      }

      callback(null, filename, true);
    });
  });
}

spider(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Completed the download of '${filename}.'`);
  } else {
    console.log(`'${filename}' was already downloaded.`);
  }
});

// node spider(.js?) https://www.example.com

// Исправления:
// 1. Убрать блок if ... else (добавить return).
// 2. Вынести логику записи файла в отдельную функцию
// 3. Вынести логику отправления запроса в отдельную функцию
