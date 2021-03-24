'use strict';

const fs = require('fs');

function tsv({
    mapFile,
    outFile
}) {
    const map = JSON.parse(fs.readFileSync(mapFile).toString());

    let text = "";
    for (const m of map) {
        text += `${m.student}\t${m.hash}`;
        if (m.url) text += `\t${m.url}`;
        text += '\n';
    }

    fs.writeFileSync(outFile, text);
}

module.exports = tsv;
