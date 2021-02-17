'use strict';

const fs = require('fs');

function get({
    input,
    hash,
    mapFile
}) {
    const map = JSON.parse(fs.readFileSync(mapFile).toString());
    const entry = map.find(
        (e) => hash ? e.hash === input : e.student === input);
    if (entry) {
        console.log(entry);
    } else {
        console.log('No mapping found.');
    }
}

module.exports = get;
