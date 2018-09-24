"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.importSchema = function (path) {
    var schema = [];
    var files = getFiles(path);
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        schema.push(fs.readFileSync(file, { encoding: 'utf8' }));
    }
    return schema;
};
var getFiles = function (dir, files_) {
    if (files_ === void 0) { files_ = []; }
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name_1 = dir + '/' + files[i];
        if (fs.statSync(name_1).isDirectory()) {
            getFiles(name_1, files_);
        }
        else {
            var regex = /^.*\.graphql/g;
            if (regex.exec(name_1)) {
                files_.push(name_1);
            }
        }
    }
    return files_;
};
