const path = require('path')
const fs = require('fs');
const async = require('async');
const src = require('../src/program');
const colors = require('colors');
const testfile = path.join(path.dirname(fs.realpathSync(__filename)), './data/rubina.json');

const words = require(testfile);
verbose = true;
total = 0;
bad = 0;
commander = {
  //"custom": "hy_AM_5"
}

src
.init(commander)
.then(function(dict) {
  async.forEachOf(words, function(incorrect, correct, callback) {
    src
    .correct(incorrect, dict)
    .then(function(val) {
      var iscorrect = val[0],
          suggestions = val[1]
      total += 1;
      if (iscorrect || suggestions == null || suggestions.indexOf(correct) < 0) {
          // This test assumes that all words fed in are incorrect so we will count iscorrect as bad
          bad += 1
          process.stdout.write(colors.red("X"));
          if (verbose) console.log(" > incorrect", incorrect, "| correct", correct, "| suggestions", suggestions != null ? suggestions : "thinks word is correct")
      } else {
          process.stdout.write(colors.green("O"));
          if (verbose) console.log(" > incorrect", incorrect, "| correct", correct, "| suggestions", suggestions != null ? suggestions : "thinks word is correct")
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
});
