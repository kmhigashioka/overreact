var {ensureModuleNameProvided, ensureModuleExists, _generate, _generateTest} = require('./utils');

module.exports = exports = function (name, options, config) {
  let [moduleName, entityName] = name.split(':');

  ensureModuleNameProvided(name);
  ensureModuleExists(moduleName);

  _generate('component', moduleName, entityName, options, config);
  _generateTest('component', moduleName, entityName, config);
}
