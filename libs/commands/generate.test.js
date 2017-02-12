const {expect} = require('chai');
const fse = require('fs-extra');
const fs = require('fs');

const {getGenerator, validateName} = require('./generate');

describe('generate commands', () => {

  describe('.getGenerator()', () => {
    it('should return undefined unhandled generator', () => {
      const generator = getGenerator('components');

      expect(generator).to.be.equal(undefined);
    });

    it('should find valid generator for component', () => {
      const generator = getGenerator('component');

      expect(generator).not.to.equal(undefined);
    });
  });

  describe('.validateName()', () => {
    it('should validate valid name', () => {
      const name = validateName('main:component');

      expect(name).to.be.true;
    });

    it('should validate invalid name', () => {
      let name = validateName('main:component:yeah');

      expect(name).to.be.false;

      name = validateName('main:component.js');

      expect(name).to.be.false;
    });
  });

});
