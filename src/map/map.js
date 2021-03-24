'use strict';

const fs = require('fs');
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

    if (students.length > numHashes) {
        console.error('More students than possible hashes! Aborting!');
        return;
    }

    if (students.length > numHashes * 0.8) {
        console.warn(
            'Hash range heavily utilized',
            `(mapping ${students.length} to ${numHashes} hashes).`,
            'This may take a moment.');
    };

    const candidates = new Set(students);
    const used = new Set();
    let hashes = [];

    const maxSalt = 10000;
    let salt = 0;

    do {
        const saltString = salt.toString();
        candidates.forEach((c) => {
            const h = hash(c, saltString, 'md5', numHashes);
            if (used.has(h)) return;
            used.add(h);
            hashes[students.findIndex((s) => s === c)] = h;
            candidates.delete(c);
        })
        salt++;
    } while (candidates.size > 0 && salt < maxSalt)

    if (salt === maxSalt) {
        console.error('Could not find a distinct mapping!');
        return;
    }

    // sanity check. should be ensured by using sets, but just to make sure...
    if (hashes.some((h, i) => hashes.findIndex((h2) => h2 === h) !== i)) {
        console.error('Generated invalid mapping.');
        return;
    }

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
