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

const map = new Map();

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }

  if (map.has(currentUrl)) {
    return process.nextTick(callback);
  }

  map.set(currentUrl, true);

  const links = utilities.getPageLinks(currentUrl, body);

  if (links.length === 0) {
    return process.nextTick(callback);
  }

  let completed = 0, hasErrors = false;

  function done(err) {
    map.remove(currentUrl);

    if (err) {
      hasErrors = true;
      return callback(err);
    }

    if (++completed === links.length && !hasErrors) {
      return callback();
    }
  }

  links.forEach(link => spider(link, nesting - 1, done));
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
    console.log('Spider: Error:', err);
  } else if (downloaded) {
    console.log(`Spider: Completed downloading '${filename}.'`);
  } else {
    console.log(`Spider: Already downloaded '${filename}'.`);
  }
});

// node spider https://www.example.com
