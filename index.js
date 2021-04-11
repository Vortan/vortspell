#!/usr/bin/env node
var commander = require("commander");
var src = require("./src/program");

commander
    .version(require("./package.json").version)
    .option("-w, --western", "Spellcheck using Western Armenian dictionary (default is Eastern)")
    .option("-c, --custom <custom>", "Spellcheck using custom dictionary");

commander
    .command("correct <word>")
    .description("Return suggestions for misspelled word")
    .action(function (word) {
        src.init(commander).then(function (dict) {
            src.correct(word, dict).then(console.log).catch(console.error);
        });
    });

commander
    .command("suggest <word>")
    .description("Return a single word as asuggestion for a misspelled word")
    .action(function (word) {
        src.init(commander).then(function (dict) {
            src.correct(word, dict)
                .then(function (response) {
                    if (response === null || response.length != 2) {
                        console.log("");
                    } else if (response[0] === true) {
                        console.log(word);
                    } else {
                        console.log(response[1][0]);
                    }
                })
                .catch(console.error);
        });
    });

commander.parse(process.argv);
