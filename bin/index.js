#! /usr/bin/env node
const {program} = require('commander')
const pkgJSON = require('../package.json')

program.version(pkgJSON.version)


program.command('init')
    .name("init")
    .usage("[global options] command")
    .description('easy cli int')
    .action(function() {
        require('../commands/init.js')
    })

program.parse()