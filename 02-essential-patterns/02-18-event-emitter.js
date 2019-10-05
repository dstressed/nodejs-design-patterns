const EventEmitter = require('events');

function helloEvents() {
  const eventEmitter = new EventEmitter();
  setTimeout(() => eventEmitter.emit('hello', 'Hello World from an event!'), 100);
  return eventEmitter;
}

function helloCallback(callback) {
  setTimeout(() => callback('Hello World from a callback!'), 100);
}

const f = arg => console.log(arg);

helloEvents().on('hello', f);
helloCallback(f);
