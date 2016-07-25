const Promise = require('bluebird');

module.exports = function(word, dict) {
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
