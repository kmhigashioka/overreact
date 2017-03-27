const fs = require('fs');
const _ = require('lodash');
const yaml = require('js-yaml');

const DEFAULT_CONFIG = {
  tabSize: 2
};

module.exports = {
  checkFileExists,
  DEFAULT_CONFIG,
  getCustomConfig,
  parseYamlFromFile,
  readConfig
};

function checkFileExists(path) {
  try {
    fs.lstatSync(path);
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }

  return true;
}

function generateConfig(overrides) {
  let config = _.clone(DEFAULT_CONFIG);
  return _.assign(config, overrides);
}

function getCustomConfig(overrides = {}) {
  let config = generateConfig(overrides);

  return yaml.safeDump(config);
}

function readConfig() {
  let userConfigPath = './overreact_cli.yaml';
  let config = DEFAULT_CONFIG;

  if (checkFileExists(userConfigPath)) {
    let userConfig = parseYamlFromFile(userConfigPath);
    _.assign(config, userConfig);
  }

  return config;
}

function parseYamlFromFile(path) {
  let content = fs.readFileSync(path, {encoding: 'utf-8'});
  return yaml.safeLoad(content);
}
