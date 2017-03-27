'use strict';

const program = require('commander');
const {generate} = require('./libs/commands/generate');
const nodePackage = require('./package');
const {readConfig} = require('./libs/utils');

program
  .command('generate [type] [name]')
  .alias('g')
  .version(nodePackage.version)
  .action(function (type, name, options) {
    const config = readConfig();

    generate(type, name, options, config);
  });

program.parse(process.argv);
