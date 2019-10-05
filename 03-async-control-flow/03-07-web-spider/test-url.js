const url = require('url');

console.log(url.parse('https://www.example.com'));

console.log(url.resolve('https://www.example.com', 'https://www.example.com/best-videos'));
