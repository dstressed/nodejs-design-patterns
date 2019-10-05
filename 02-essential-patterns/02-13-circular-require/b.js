console.log('b: Initializing b.');
exports.loaded = false;
console.log('b: Requiring a.');
const a = require('./a');
console.log('b: Exporting.', a);
module.exports = {
  aWasLoaded: a,
  loaded: true
};
