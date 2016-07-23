#!/usr/bin/env node
var commander = require('commander');
var src = require('./src/program');

commander
  .version(require('./package.json').version)
  .option('-w, --western',
          'Spellcheck in Western Armenian (default is Eastern)')

commander
  .command('correct <word>')
  .description('Return suggestions for mispelled word')
  .action(function(word) {
    src
    .correct(word, commander)
    .then(console.log)
    .catch(console.error);
  });

commander
  .parse(process.argv);
