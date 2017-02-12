const {expect} = require('chai');
const fse = require('fs-extra');
const fs = require('fs');

const {getOutputPath,
      checkForFeatureName,
      getTemplatePath,
      getTemplateVariables,
      getTestOutputPath,
      getTestTemplateVariables} = require('./utils');

describe('utils', () => {

  describe('.getOutputPath()', () => {
    it('should get output path for component', () => {
      const path = getOutputPath('component', 'SubHeader', 'main');

      expect(path).to.be.equal('./app/features/main/components/sub-header.js');
    });
  });

  describe('.checkForFeatureName()', () => {
    it('should have feature name', () => {
      const hasModuleName = checkForFeatureName('main:SubHeader');

      expect(hasModuleName).to.be.true;
    });

    it('should does not have feature name', () => {
      const hasModuleName = checkForFeatureName('SubHeader');

      expect(hasModuleName).to.be.false;
    });
  });

  describe('.getTemplatePath()', () => {
    it('should get template path for component', () => {
      const templatePath = getTemplatePath('component');

      expect(templatePath).to.contain('templates/components/generic.tt');
    });

    it('should get template path component spec', () => {
      const templatePath = getTemplatePath('component', {testTemplate: true});

      expect(templatePath).to.contain('templates/components/spec.tt');
    });
  });

  describe('.getTemplateVariables()', () => {
    it('should get template var for component', () => {
      const tempvar = getTemplateVariables('component', 'main', 'subHeader');

      expect(tempvar).to.deep.equal({
        "featureName": "main",
        "componentName": "SubHeader"
      });
    });

    it('should get default value', () => {
      const tempvar = getTemplateVariables('undefined', 'main', 'subHeader');

      expect(tempvar).to.deep.equal({});
    });
  });

  describe('.getTestOutputPath()', () => {
    it('should get test output path for component', () => {
      const path = getTestOutputPath('component', 'SubHeader', 'main');

      expect(path).to.be.equal('./app/features/main/components/sub-header.spec.js');
    });
  });

  describe('.getTestTemplateVariables()', () => {
    it('should get test template var for component', () => {
      const tempvar = getTestTemplateVariables('component', 'main', 'subHeader');

      expect(tempvar).to.deep.equal({
        "featureName": "main",
        "componentName": "SubHeader"
      });
    });

    it('should get default value', () => {
      const tempvar = getTemplateVariables('undefined', 'main', 'subHeader');

      expect(tempvar).to.deep.equal({});
    });
  });
});
