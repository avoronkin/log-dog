'use strict';
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
        return !pattern || pattern.test(data.line);
    });

    mixin(middleware, proto, false);

    return middleware;
}
