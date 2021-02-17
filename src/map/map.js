'use strict';

const fs = require('fs');
const collision = require('./collision');
const hash = require('./hash');
const readStudents = require('./readStudents');

function map({
    studentsFile,
    numHashes,
    format,
    base,
    url,
    pattern,
    mapFile
}) {
    const students = readStudents(studentsFile, format);

    console.log('Searching for distinct mapping...');
    const maxSecret = 10000;
    const logStep = 100;
    let salt = 0;
    let hashes = [];

    do {
        salt++;
        if (salt % logStep === 0) console.log('Iteration', salt);
        const secretString = salt.toString();
        hashes = students.map((s) => hash(s, secretString, 'md5', numHashes));
    } while (collision(hashes) && salt < maxSecret)

    if (salt === maxSecret) {
        console.error('Could not find a distinct mapping!');
        return;
    }

    console.log(`Found distinct mapping with salt`, salt);

    const hashLength = (numHashes - 1).toString(base).length;
    hashes = hashes.map((h) => h.toString(base).padStart(hashLength, '0'));

    const map = students.map((student, i) => {
        const hash = hashes[i]
        const m = { student, hash };
        if (url) {
            m.url = url.replace(pattern, hash);
        }
        return m;
    })

    fs.writeFileSync(mapFile, JSON.stringify(map, null, 4));
}

module.exports = map;
