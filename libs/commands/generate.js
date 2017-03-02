var generateComponent = require('../generators/component');

module.exports = {
  getGenerator,
  validateName,
  generate
}

function generate(type, name, options = {}, config = {}) {
  let generator = getGenerator(type);

  if (!generator) {
    console.log(`Could not find a generator for ${type}`);
    console.log('Run `overreact generate --help` for more options.');
    return;
  }

  if (!validateName(name)) {
    console.log(`${name} is an invalid name`);
    console.log('Name of the file cannot contain any dots.');
    return;
  }

  generator(name, options, config);
}

function getGenerator (type) {
  var generatorMap = {
    component: generateComponent
  };

  return generatorMap[type];
}

function validateName(name) {
  let entityName;
  if (/.*:.*/.test(name)) {
    const split = name.split(':');
    if (split.length !== 2) {
      return false;
    }
    entityName = split[1];
  } else {
    entityName = name;
  }
  
  if (entityName.indexOf('.') > -1) {
    return false;
  }

  return true;
}
