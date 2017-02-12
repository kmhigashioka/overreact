'use strict';

var program = require('commander');
var {generate} = require('./libs/commands/generate');
var nodePackage = require('./package');

program
  .command('generate [type] [name]')
  .alias('g')
  .version(nodePackage.version)
  .action(function (type, name) {
    generate(type, name);
  });

program.parse(process.argv);
