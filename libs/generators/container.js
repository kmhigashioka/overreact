var {ensureModuleNameProvided, ensureModuleExists, _generate, _generateTest} = require('./utils');

module.exports = exports = function (name, options, config) {
  let [moduleName, entityName] = name.split(':');

  ensureModuleNameProvided(name);
  ensureModuleExists(moduleName);

  _generate('container', moduleName, entityName, options, config);
  _generateTest('container', moduleName, entityName, config);
  _generate('component', moduleName, entityName, options, config);
  _generateTest('component', moduleName, entityName, config);
  _generate('duck', moduleName, entityName, options, config);
  _generateTest('duck.action', moduleName, entityName, options, config);
  _generateTest('duck.reducer', moduleName, entityName, options, config);
}
