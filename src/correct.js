const Promise = require('bluebird');

module.exports = function(word, nodehun) {
    return new Promise(function(resolve, reject) {
        nodehun.suggest(word)
            .then(
                suggestions => {
                    var is_correct = suggestions === null;
                    resolve([is_correct, suggestions])
                },
                reason => {
                    reject(reason);
                }
            );
    })
};
