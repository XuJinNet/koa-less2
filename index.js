/**
 * This middleware was created to allow processing of Less files for koa
 * @module koa-less2
 */

'use strict';

let lessMiddleware = require('less-middleware');

module.exports = function () {
    let options = arguments;
    return function (ctx, next) {
        return new Promise(function (resolve, reject) {
            lessMiddleware.apply(ctx, options)(ctx.req, ctx.res, function (error) {
                if(!error) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        }).then(function () {
            return next();
        });
    };
};