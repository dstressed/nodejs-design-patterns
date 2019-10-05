const EventEmitter = require('events');
const eeInstance = new EventEmitter();

const listener = (arg1, arg2) => console.log(arg1, arg2);
const eventName = 'node.js';

// Добавление ФН
eeInstance.on(eventName, listener);
eeInstance.addListener(eventName, listener);
eeInstance.once(eventName, listener);
eeInstance.prependListener(eventName, listener);
eeInstance.prependOnceListener(eventName, listener);

// Удаление ФН
eeInstance.off(eventName, listener);
eeInstance.removeListener(eventName, listener);
eeInstance.removeAllListeners(eventName || undefined);

eeInstance.emit(eventName, 'is', 'awesome'); // Возвращает true или false.

eeInstance.eventNames(); // Возвращает массив строк или Symbol-ов.
eeInstance.listenerCount(eventName);
eeInstance.listeners(eventName);

eeInstance.getMaxListeners();
eeInstance.setMaxListeners(20);
// EventEmitter.defaultMaxListeners = 10;

// eeInstance.rawListeners(eventName);
