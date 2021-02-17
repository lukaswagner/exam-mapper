'use strict';

function collision(hashes) {
    const used = [];
    return hashes.some(h => {
        if (used[h]) return true;
        used[h] = true;
        return false;
    });
}

module.exports = collision;
