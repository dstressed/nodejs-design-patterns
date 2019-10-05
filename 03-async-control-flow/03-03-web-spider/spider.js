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
  console.log(`Spider: Downloading '${url}'.`);
  request(url, (err, response, body) => {
    if (err) {
      return callback(err);
    }

    saveFile(filename, body, (err) => {
      if (err) {
        return callback(err);
      }

      console.log(`Spider: Downloaded and saved '${url}'.`);
      callback(null, body);
    });
  });
}

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }

  const links = utilities.getPageLinks(currentUrl, body);

  function iterate(index) {
    if (index === links.length) {
      return callback();
    }

    spider(links[index], nesting - 1, (err) => {
      if (err) {
        return callback(err);
      }
      iterate(index + 1);
    });
  }

  iterate(0);
}

function spider(url, nesting, callback) {
  const filename = utilities.urlToFilename(url);

  fs.readFile(filename, (err, body) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return callback(err);
      }

      return download(url, filename, (err, body) => {
        if (err) {
          return callback(err);
        }

        spiderLinks(url, body, nesting, callback);
      });
    }

    spiderLinks(url, body, nesting, callback);
  });
}

spider(process.argv[2] || 'https://www.example.com', 1, (err, filename, downloaded) => {
  if (err) {
    console.log('Spider: Error:',err);
  } else if (downloaded) {
    console.log(`Spider: Completed downloading '${filename}.'`);
  } else {
    console.log(`Spider: Already downloaded '${filename}'.`);
  }
});

// node spider(.js?) https://www.example.com

// Вопрос: почему не загрузить ссылки, используя простой цикл?
