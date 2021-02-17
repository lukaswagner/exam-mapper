'use strict';

const fs = require('fs');

function readStudents(file, format) {
    const contents = fs.readFileSync(file).toString();
    switch (format) {
        case 'txt':
            return contents
                .split("\n")
                .map((s) => s.trim())
                .filter((s) => s.length > 0);
        case 'json':
            return JSON.parse(contents);
        default:
            return [];
    }
}

module.exports = readStudents;
