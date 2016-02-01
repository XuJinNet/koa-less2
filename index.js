/**
 * This middleware was created to allow processing of Less files for koa
 * @module koa-less2
 */

'use strict';

let lessMiddleware = require('less-middleware');

function less(req, res, options) {
    return function (callback) {
        lessMiddleware.apply(this, options)(req, res, callback);
    };
}

module.exports = function () {
    var options = arguments;
    return function* (next) {
        yield less(this.req, this.res, options);
        yield next;
    };
};