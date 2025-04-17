# webpack-uniter-plugin

[![Build Status](https://github.com/uniter/webpack-uniter-plugin/workflows/CI/badge.svg)](https://github.com/uniter/webpack-uniter-plugin/actions?query=workflow%3ACI)

Webpack plugin for requiring PHP files from JavaScript using [Uniter][] via [uniter-loader][].

## Usage

```shell
npm install --save-dev webpack webpack-uniter-plugin
```

### Simple usage (requiring a single PHP module)

Add to `webpack.config.js`:
```javascript
const UniterPlugin = require('webpack-uniter-plugin');

module.exports = {
    context: __dirname,
    entry: './js/src/index',
    output: {
        path: __dirname + '/dist/',
        filename: 'browser.js'
    },
    plugins: [
        new UniterPlugin()
    ]
};
```

Define an empty `uniter.config.js`:
```javascript
module.exports = {};
```

Create a PHP module `php/src/MyApp/doubleIt.php`:
```php
<?php

namespace MyApp;

$doubleIt = function ($num) {
    return $num * 2;
};

return $doubleIt;
```

Call from JS module `js/src/index.js`:
```javascript
var doubleItModule = require('./php/src/MyApp/doubleIt.php')();

doubleItModule.execute().then(function (doubleIt) {
    console.log('Double 4 is ' + doubleIt(4));
});
```

Run Webpack:
```shell
mkdir dist
node_modules/.bin/webpack --devtool=source-map --mode=development --progress
```

Load the bundle on a webpage, `demo.html`:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">

        <title>Webpack-Uniter-Plugin demo</title>
    </head>
    <body>
        <h1>Webpack-Uniter-Plugin demo</h1>

        <script src="dist/browser.js"></script>
    </body>
</html>
```

and open `demo.html` in a browser.

[Uniter]: https://github.com/asmblah/uniter
[uniter-loader]: https://github.com/uniter/loader
