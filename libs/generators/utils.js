const {checkFileExists} = require('../utils');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const fse = require('fs-extra');
const logger = require('../logger');

module.exports = {
  ensureModuleNameProvided,
  ensureModuleExists,
  checkForFeatureName,
  _generate,
  getTemplatePath,
  readTemplateContent,
  getOutputPath,
  getTemplateVariables,
  compileTemplate,
  _generateTest,
  getTestOutputPath,
  getTestTemplateVariables
};

function ensureModuleNameProvided(name) {
  if (! checkForFeatureName(name)) {
    console.log(`Invalid name: ${name}. Did you remember to provide the module name?`);
    console.log('Run `overreact generate --help` for more options.');
    process.exit(1);
  }
}

function checkForFeatureName(str) {
  let re = /.*\:.*/;
  return re.test(str);
}

function ensureModuleExists(moduleName) {
  if (! checkFileExists(`./app/features/${moduleName}`)) {
    console.log(`A feature named ${moduleName} does not exist. Try to generate it first.`);
    console.log('Run `overreact generate --help` for more options.');
    process.exit(1);
  }
}

function _generate(type, moduleName, entityName, options, config) {
  let templateContent = readTemplateContent(type, options, config);
  let outputPath = getOutputPath(type, entityName, moduleName);
  let templateVariables = getTemplateVariables(type, moduleName, entityName, options);
  let component = compileTemplate(templateContent, templateVariables, config);
  
  if (checkFileExists(outputPath)) {
    logger.exists(outputPath);
    return {exists: true, outputPath};
  }

  fse.outputFileSync(outputPath, component);
  logger.create(outputPath);
  return {exists: false, outputPath};
}

function readTemplateContent(type, templateOptions, config) {
  // First, try to get custom template from config
  // If cannot find custom template, return the default
  if (checkForCustomTemplate(config, type, templateOptions)) {
    let templateConfig = getCustomTemplate(config, type, templateOptions);
    return templateConfig.text;
  } else {
    let templatePath = getTemplatePath(type, templateOptions);
    return fs.readFileSync(templatePath);
  }
}

function getTemplatePath(type, options = {}) {
  let relativePath;

  if (options.testTemplate) {
    switch(type) {
      case 'component':
        relativePath = `../../templates/components/spec.tt`;
        break;
      case 'container':
        relativePath = `../../templates/containers/spec.tt`;
        break;
      case 'duck.action':
        relativePath = `../../templates/duck/spec-action.tt`;
        break;
      case 'duck.reducer':
        relativePath = `../../templates/duck/spec-reducer.tt`;
        break;
    }
  } else {
    switch(type) {
      case 'component':
        relativePath = `../../templates/components/generic.tt`;
        break;
      case 'container':
        relativePath = `../../templates/containers/redux-decorator.tt`;
        break;
      case 'duck':
        relativePath = `../../templates/duck/duck.tt`;
        break;
    }
  }

  return path.resolve(__dirname, relativePath);
}

function getOutputPath(type, entityName, featureName) {
  let outputFileName = `${_.kebabCase(entityName)}.js`;
  
  switch(type) {
    case 'duck': return `./app/features/${featureName}/duck.js`;
    default: return `./app/features/${featureName}/${type}s/${outputFileName}`; 
  }
}

function getTemplateVariables(type, featureName, fileName, options = {}) {
  switch (type) {
    case 'component':
      return {
        featureName: _.snakeCase(featureName),
        componentName: _.upperFirst(_.camelCase(fileName))
      };
    case 'container':
      return {
        featureName: _.snakeCase(featureName),
        componentName: _.upperFirst(_.camelCase(fileName)),
        componentFilename: `${_.kebabCase(fileName)}.js`,
        containerName: `${_.upperFirst(_.camelCase(fileName))}Container`
      };
    case 'duck':
      return {};

    default: return {};
  }
}

function compileTemplate(content, variables, config) {
  let compiled = _.template(content)(variables);
  let tab = _.repeat(' ', config.tabSize);
  const defaultTabSize = 2;

  // TODO: windows newline
  // customize tabSpace by replacing spaces followed by newline
  return compiled.replace(/(\n|\r\n)( +)/g, function (match, lineBreak, defaultTab) {
    let numTabs = defaultTab.length / defaultTabSize;
    return lineBreak + _.repeat(tab, numTabs);
  });
}

function _generateTest(type, featureName, entityName, config) {
  let templateContent = readTemplateContent(type, {testTemplate: true}, config);
  let outputPath = getTestOutputPath(type, entityName, featureName);
  let templateVariables = getTestTemplateVariables(type, featureName, entityName);
  let component = _.template(templateContent)(templateVariables);

  if (checkFileExists(outputPath)) {
    logger.exists(outputPath);
    return outputPath;
  }

  fse.outputFileSync(outputPath, component);
  logger.create(outputPath);
  return outputPath;
}

function getTestOutputPath(type, entityName, featureName) {
  let outputFileName = `${_.kebabCase(entityName)}.spec.js`;
  switch(type) {
    case 'duck.action': return `./app/features/${featureName}/duck.action.spec.js`;
    case 'duck.reducer': return `./app/features/${featureName}/duck.reducer.spec.js`;
    default: return `./app/features/${featureName}/${type}s/${outputFileName}`;
  }
}

function getTestTemplateVariables(type, featureName, fileName) {
  switch (type) {
    case 'component':
      return {
        featureName: _.snakeCase(featureName),
        componentName: _.upperFirst(_.camelCase(fileName))
      };

    case 'container':
      return {
        featureName: _.snakeCase(featureName),
        containerName: `${_.upperFirst(_.camelCase(fileName))}Container`,
        containerFilename: `${_.kebabCase(fileName)}.js`
      };

    case 'duck.action':
      return {
        featureName: _.snakeCase(featureName)
      };
    
    case 'duck.reducer':
      return {
        featureName: _.snakeCase(featureName)
      };

    default: return {};
  }
}

function checkForCustomTemplate(config, entityType, options) {
  if (!config.templates) {
    return false;
  }
  const template = getCustomTemplate(config, entityType, options);
  return !_.isEmpty(template);
}

function getCustomTemplate(config, entityType, {testTemplate = false}) {
  const selector = {name: entityType};
  if(testTemplate) {
    selector.test = true;
  }
  const templateConfig = _.find(config.templates, selector);

  return templateConfig;
}
