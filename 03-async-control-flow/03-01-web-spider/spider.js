'use strict';

const fs = require('fs');
const path = require('path');
const request = require('request');
const mkdirp = require('mkdirp');
const utilities = require('./utilities');

function spider(url, callback) {
  const filename = utilities.urlToFilename(url);

  fs.readFile(filename, (err, file) => { // BP. exists устарел, используйте readFile и проверку на ошибку.
    if (err) {
      console.log(`Downloading '${url}'.`);

      request(url, (err, response, body) => { // BP
        if (err) {
          callback(err);
        } else {
          mkdirp(path.dirname(filename), (err) => { // BP
            if (err) {
              callback(err);
            } else {
              fs.writeFile(filename, body, (err) => { // BP
                if (err) {
                  callback(err);
                } else {
              callback(null, filename, true);
            }
          });
        }
          });
        }});
    } else {
      callback(null, filename, false);
    }
  });
}

spider(process.argv[2] || 'https://www.example.com', (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Downloaded '${filename}.'`);
  } else {
    console.log(`Already downloaded '${filename}'.`);
  }
});

console.log('process.argv:', process.argv);

// node spider https://www.example.com
