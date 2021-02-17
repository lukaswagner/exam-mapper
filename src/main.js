'use strict';

const yargs = require('yargs');

yargs
    .command(require('./map'))
    .command(require('./get'))
    .option('mapFile', {
        alias: ['m'],
        description:
            'File for storing/loading the generated map. ' +
            'As the file is stored as JSON, this should end in .json',
        type: 'string',
        default: 'map.json',
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
