'use strict';

exports.command = 'get <input>';
exports.aliases = ['lookup'];
exports.describe = 'Look up a student or hash in the map.';
exports.handler = require("./get/get");
exports.builder = (yargs) => {
    yargs
        .positional('input', {
            description:
                'The student to look up.',
            type: 'string'
        })
        .option('hash', {
            alias: ['h'],
            description:
                'Interpret input as hash ' +
                'and look up the respective student.',
            type: 'boolean',
        })
};
