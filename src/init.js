const nodehun = require("nodehun");
const Promise = require("bluebird");
const path = require("path");
const fs = require("fs");
const util = require("util");

const dictionaryDir = path.join(path.dirname(fs.realpathSync(__filename)), "../dicts");
var affbuf, dicbuf, dict;

module.exports = function (commander) {
    return new Promise(function (resolve, reject) {
        if (commander.custom) {
            affbuf = fs.readFileSync(util.format("%s/%s.aff", dictionaryDir, commander.custom));
            dicbuf = fs.readFileSync(util.format("%s/%s.dic", dictionaryDir, commander.custom));
        } else if (commander.western) {
            affbuf = fs.readFileSync(dictionaryDir + "/hyspell-c.aff");
            dicbuf = fs.readFileSync(dictionaryDir + "/hyspell-c.dic");
        } else {
            affbuf = fs.readFileSync(dictionaryDir + "/hyspell-r.aff");
            dicbuf = fs.readFileSync(dictionaryDir + "/hyspell-r.dic");
        }
        dict = new nodehun(affbuf, dicbuf);
        resolve(dict);
    });
};
