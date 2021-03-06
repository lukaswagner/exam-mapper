'use strict';

exports.command = 'map <studentsFile> <numHashes>';
exports.aliases = ['build'];
exports.describe = 'Map students to hashes.';
exports.handler = require("./map/map");
exports.builder = (yargs) => {
    yargs
        .positional('studentsFile', {
            description:
                'File containing a list of students. ' +
                'The students are handles as strings, ' +
                'so the input can be either names or numbers.',
            type: 'string'
        })
        .positional('numHashes', {
            description:
                'Number of possible output hashes, ' +
                'i.e. the maximum hash plus 1 (hashes start at 0).',
            type: 'number'
        })
        .option('format', {
            alias: ['f'],
            description:
                'Input format for students file. ' +
                'Can be a newline-separated text file ' +
                'or a JSON file containing an array.',
            choices: ['txt', 'json'],
            type: 'string',
            default: 'txt',
        })
        .option('base', {
            alias: ['b'],
            description: 'Numeric base for resulting hashes.',
            type: 'number',
            default: 16,
        })
        .option('url', {
            alias: ['u'],
            description:
                'File sharing URL template. If specified, ' +
                'student-specific URLs are generated by replacing ' +
                'a pattern with the respective hash.',
            type: 'string',
        })
        .option('pattern', {
            alias: ['p'],
            description:
                'Template pattern in given file sharing URL.',
            type: 'string',
            default: '{hash}',
        })
};
