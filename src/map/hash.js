'use strict';

const crypto = require('crypto');

function hash(input, salt, algorithm, range) {
    const maxLength = range.toString(16).length;
    const hashString =
        crypto.createHmac(algorithm, salt)
            .update(input)
            .digest('hex')
            .substring(0, maxLength);
    const hashNum = parseInt(hashString, 16);
    return hashNum % range;
}

module.exports = hash;
