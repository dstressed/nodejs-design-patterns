console.log('a: Initializing a.');
console.log('a: Requiring b.');
const b = require('./b');
console.log('a: Exporting.', b);
module.exports = {
  bWasLoaded: b.loaded,
  loaded: true
};
