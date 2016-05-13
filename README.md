# koa-less2x

Less2 middleware for koa2. A wrapper of less-middleware.

## Installation

```js
$ npm install koa-less2x
```

## Example

```js
var less = require('koa-less2x');
var serve = require('koa-static');
var koa = require('koa');
var app = new koa();

app.use(less('./public'));

app.use(serve('./public'));

app.listen(3000);
```

## Options

See [the less middleware document](https://github.com/emberfeather/less.js-middleware).

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><code>debug</code></th>
            <td>Show more verbose logging?</td>
            <td><code>false</code></td>
        </tr>
        <tr>
            <th><code>dest</code></th>
            <td>Destination directory to output the compiled <code>.css</code> files.</td>
            <td>Same directory as less source files.</td>
        </tr>
        <tr>
            <th><code>force</code></th>
            <td>Always re-compile less files on each request.</td>
            <td><code>false</code></td>
        </tr>
        <tr>
            <th><code>once</code></th>
            <td>Only recompile once after each server restart. Useful for reducing disk i/o on production.</td>
            <td><code>false</code></td>
        </tr>
        <tr>
            <th><code>pathRoot</code></th>
            <td>Common root of the source and destination. It is prepended to both the source and destination before being used.</td>
            <td><code>null</code></td>
        </tr>
        <tr>
            <th><code>postprocess</code></th>
            <td>Object containing functions relevant to preprocessing data.</td>
            <td></td>
        </tr>
        <tr>
            <th><code>postprocess.css</code></th>
            <td>Function that modifies the compiled css output before being stored.</td>
            <td><code>function(css, req){...}</code></td>
        </tr>
        <tr>
            <th><code>preprocess</code></th>
            <td>Object containing functions relevant to preprocessing data.</td>
            <td></td>
        </tr>
        <tr>
            <th><code>preprocess.less</code></th>
            <td>Function that modifies the raw less output before being parsed and compiled.</td>
            <td><code>function(src, req){...}</code></td>
        </tr>
        <tr>
            <th><code>preprocess.path</code></th>
            <td>Function that modifies the less pathname before being loaded from the filesystem.</td>
            <td><code>function(pathname, req){...}</code></td>
        </tr>
        <tr>
            <th><code>preprocess.importPaths</code></th>
            <td>Function that modifies the import paths used by the less parser per request.</td>
            <td><code>function(paths, req){...}</code></td>
        </tr>
        <tr>
            <th><code>render</code></th>
            <td>Options for the less render. See the "<code>render</code> Options" section below.</td>
            <td>&hellip;</td>
        </tr>
        <tr>
            <th><code>storeCss</code></th>
            <td>Function that is in charge of storing the css in the filesystem.</td>
            <td><code>function(pathname, css, req, next){...}</code></td>
        </tr>
        <tr>
            <th><code>cacheFile</code></th>
            <td>Path to a JSON file that will be used to cache less data across server restarts. This can greatly speed up initial load time after a server restart - if the less files haven't changed and the css files still exist, specifying this option will mean that the less files don't need to be recompiled after a server restart.</td>
            <td></td>
        </tr>
    </tbody>
</table>

### `render` Options

The `options.render` is passed directly into the `less.render` with minimal defaults or changes by the middleware.

The following are the defaults used by the middleware:

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><code>compress</code></th>
            <td><code>auto</code></td>
        </tr>
        <tr>
            <th><code>yuicompress</code></th>
            <td><code>false</code></td>
        </tr>
        <tr>
            <th><code>paths</code></th>
            <td><code>[]</code></td>
        </tr>
    </tbody>
</table>

Example of use:   
```js
var path=require('path');
app.use(require('koa-less2x')('/my/less/source/path', {
  dest: path.join(__dirname, 'public')
}));
```

## Troubleshooting

### My less never recompiles, even when I use `{force: true}`!

Make sure you're declaring less-middleware before your static middleware, if you're using the same directory, e.g. (with koa-static):


```js
var lessMiddleware = require('koa-less2x');
var app = new koa();
app.use(lessMiddleware(__dirname + '/public'));
app.use(require('koa-static')(__dirname + '/public'));
```

### IIS

If you are hosting your app on IIS you will have to modify your `web.config` file in order to allow NodeJS to serve your CSS static files.  IIS will cache your CSS files, bypassing NodeJS static file serving, which in turn does not allow the middleware to recompile your LESS files.

## License

MIT
