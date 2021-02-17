'use strict';

const crypto = require('crypto');

function hash(input, salt, algorithm, range) {
    const hashString =
        crypto.createHmac(algorithm, salt)
            .update(input)
            .digest('hex');
    const hashNum = parseInt(hashString, 16);
    return hashNum % range;
}

module.exports = hash;
