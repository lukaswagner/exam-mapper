'use strict';

const yargs = require("yargs");

yargs
    .command(
        ['map', 'build'],
        'Map students to hashes.',
        (y) => {
            y
                .positional('students', {
                    description:
                        'File containing a list of students. ' +
                        'The students are handles as strings, ' +
                        'so the input can be either names or numbers.',
                    type: 'string'
                })
                .positional('hashes', {
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
        },
        (argv) => { }
    )
    .command(['get', 'lookup'],
        'Look up a student or hash in the map.',
        (y) => {
            y
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
        },
        (argv) => { })
    .option('mapFile', {
        alias: ['m'],
        description:
            'File for storing/loading the generated map. ' +
            'As the file is stored as JSON, this should end in .json',
        type: 'string',
        default: 'map',
    })
    .demandCommand()
    .locale('en')
    .help()
    .version(false)
    .fail(function (msg, err, yargs) {
        if (err) throw err;
        console.error(msg);
        console.log('\nUsage:\n');
        yargs.showHelp();
    })
    .argv;
