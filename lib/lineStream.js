'use strict'
var exec = require('child_process').exec
var readline = require('readline')

module.exports = function (readCommand) {
    var reader = exec(readCommand)

    reader.stderr.once('data', function (data) {
        throw new Error(data)
    })

    lineStream = readline.createInterface({
        input: reader.stdout
    })

    return lineStream
}
