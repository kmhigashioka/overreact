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
    it('should get output path for component, container', () => {
      const path = getOutputPath('component', 'SubHeader', 'main');

      expect(path).to.be.equal('./app/features/main/components/sub-header.js');
    });

    it('should get output path for duck', () => {
      const path = getOutputPath('duck', 'Add', 'todo');

      expect(path).to.be.equal('./app/features/todo/duck.js');
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

    it('should get template path for container', () => {
      const templatePath = getTemplatePath('container');

      expect(templatePath).to.contain('templates/containers/redux-decorator.tt');
    });

    it('should get template path for container spec', () => {
      const templatePath = getTemplatePath('container', {testTemplate: true});

      expect(templatePath).to.contain('templates/containers/spec.tt');
    });

    it('should get template path for duck', () => {
      const templatePath = getTemplatePath('duck');

      expect(templatePath).to.contain('templates/duck/duck.tt');
    });

    it('should get template path for duck action', () => {
      const templatePath = getTemplatePath('duck.action', {testTemplate: true});

      expect(templatePath).to.contain('templates/duck/spec-action.tt');
    });

    it('should get template path for duck reducer', () => {
      const templatePath = getTemplatePath('duck.reducer', {testTemplate: true});

      expect(templatePath).to.contain('templates/duck/spec-reducer.tt');
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

    it('should get template var for container', () => {
      const tempvar = getTemplateVariables('container', 'todo', 'changeStatus');

      expect(tempvar).to.deep.equal({
        componentFilename: 'change-status.js',
        componentName: 'ChangeStatus',
        containerName: 'ChangeStatusContainer',
        featureName: 'todo'
      });
    });

    it('should get template var for duck', () => {
      const tempvar = getTemplateVariables('duck', 'todo', 'changeStatus');

      expect(tempvar).to.deep.equal({});
    });
  });

  describe('.getTestOutputPath()', () => {
    it('should get test output path for component', () => {
      const path = getTestOutputPath('component', 'SubHeader', 'main');

      expect(path).to.be.equal('./app/features/main/components/sub-header.spec.js');
    });

    it('should get test output path for container', () => {
      const path = getTestOutputPath('container', 'SubHeader', 'main');

      expect(path).to.be.equal('./app/features/main/containers/sub-header.spec.js');
    });

    it('should get test output path for duck.action', () => {
      const path = getTestOutputPath('duck.action', 'SubHeader', 'main');

      expect(path).to.be.equal('./app/features/main/duck.action.spec.js');
    });

    it('should get test output path for duck.reducer', () => {
      const path = getTestOutputPath('duck.reducer', 'SubHeader', 'main');

      expect(path).to.be.equal('./app/features/main/duck.reducer.spec.js');
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

    it('should get test template var for container', () => {
      const tempvar = getTestTemplateVariables('container', 'main', 'subHeader');

      expect(tempvar).to.deep.equal({
        containerFilename: 'sub-header.js',
        containerName: 'SubHeaderContainer',
        featureName: 'main'
      });
    });

    it('should get test template var for duck.action', () => {
      const tempvar = getTestTemplateVariables('duck.action', 'main', 'subHeader');

      expect(tempvar).to.deep.equal({
        featureName: 'main'
      });
    });

    it('should get test template var for duck.reducer', () => {
      const tempvar = getTestTemplateVariables('duck.reducer', 'main', 'subHeader');

      expect(tempvar).to.deep.equal({
        featureName: 'main'
      });
    });
  });
});
