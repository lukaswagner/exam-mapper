'use strict';

exports.command = 'tsv';
exports.describe = 'export as tab-separated list';
exports.handler = require("./tsv/tsv");
exports.builder = (yargs) => {
    yargs
        .option('outFile', {
            alias: ['o'],
            description: 'File for storing the tsv.',
            type: 'string',
            default: 'map.tsv',
        })
};
