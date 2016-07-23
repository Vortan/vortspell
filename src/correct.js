var nodehun = require('nodehun');
var Promise = require('bluebird');
var path = require('path')
const fs = require('fs');

const dictionaryDir = path.join(path.dirname(fs.realpathSync(__filename)), '../dicts');
var affbuf, dictbuf, dict

module.exports = function(word, commander) {

  if (commander.western) {
    affbuf = fs.readFileSync(dictionaryDir+'/armenian_western.aff');
    dictbuf = fs.readFileSync(dictionaryDir+'/armenian_western.dic');
  } else {
    affbuf = fs.readFileSync(dictionaryDir+'/armenian_eastern.aff');
    dictbuf = fs.readFileSync(dictionaryDir+'/armenian_eastern.dic');
  }

  dict = new nodehun(affbuf,dictbuf);

  return new Promise(function(resolve, reject) {
		dict.spellSuggestions(word, function(err, correct, suggestions, origWord) {
			if (err) {
				reject(err)
			} else {
				resolve([correct, suggestions])
			}
		});
  });
};
