function loadModule(filename, module, require) {
  const wrappedSrc=`(function(module, exports, require) {
         ${fs.readFileSync(filename, 'utf8')}
       })(module, module.exports, require);`;
  eval(wrappedSrc);
}

const require = (moduleName) => {
  console.log(`Invoked require for module: ${moduleName}`);
  const id = require.resolve(moduleName);
  if (require.cache[id]) {
    return require.cache[id].exports;
  }

  const module = { // Создаются внутрении данные о модуле и объект экспорта.
    exports: {},
    id: id
  };

  require.cache[id] = module; // Модуль добавляется в кэш.
  loadModule(id, module, require); // Модуль загружается.

  return module.exports; // Возвращается объект экспорта.
};

require.cache = {};
require.resolve = (moduleName) => {
  // Вычисляется полный путь к модулю.
};

const dependency = require('./02-14-substack-pattern'); // Загружается зависимость.

function log() { // Приватная функция
  console.log('Loaded module:', dependency);
}

module.exports.run = () => { // Функция log экспортируется наружу.
  log();
};
