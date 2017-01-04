'use strict'
var ware = require('filter-ware')
var lineStream = require('./lineStream')
var mixin = require('merge-descriptors')

var proto = {
    read: function (readCommand) {
        var router = this

        lineStream(readCommand)
        .on('line', function (line) {
            router.run({
                line: line
            })
        })
    }
}

module.exports = function routerFactory() {
    var middleware = ware()
    .filter(function(pattern, data) {
        if (pattern.test(data.line)) {
            data.pattern = String(pattern)
            return true
        } else {
            return false
        }
    });

    mixin(middleware, proto, false);

    return middleware;
}
