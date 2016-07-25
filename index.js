#!/usr/bin/env node
var commander = require('commander');
var src = require('./src/program');

commander
  .version(require('./package.json').version)
  .option('-w, --western',
          'Spellcheck using Western Armenian dictionary (default is Eastern)')
  .option('-c, --custom <custom>',
          'Spellcheck using custom dictionary')

commander
  .command('correct <word>')
  .description('Return suggestions for mispelled word')
  .action(function(word) {
    src
    .init(commander)
    .then(function(dict) {
      src
      .correct(word, dict)
      .then(console.log)
      .catch(console.error);
    });
  });

commander
  .parse(process.argv);
