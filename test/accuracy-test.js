const async = require('async');
const src = require('../src/program');
const words = require('./data/rubina.json');
const colors = require('colors');

verbose = false;
total = 0;
bad = 0;

async.forEachOf(words, function(incorrect, correct, callback) {
  src
  .correct(incorrect, {})
  .then(function(val) {
    iscorrect = val[0]
    suggestions = val[1]
    total += 1;
    if (iscorrect || suggestions.indexOf(correct) > -1) {
      if (verbose) console.log(colors.green(correct));
    } else {
      bad += 1
      if (verbose) console.log(colors.red(correct));
    }
    callback(); // show that no errors happened
  })
  .catch(callback);
}, function(error) {
  if(error) {
    console.log(error);
  } else {
    accuracy = ((total-bad)/total * 100).toFixed(2);
    console.log(accuracy + "%");
  }
});
