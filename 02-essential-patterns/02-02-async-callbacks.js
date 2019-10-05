function addAsync(a, b, callback) {
  setTimeout(n => callback(a + b + n), 100, 7);
}

console.log('before');
addAsync(1, 2, result => console.log('Result: ' + result));
console.log('after');

// См. 02-03-async-callbacks.png.
