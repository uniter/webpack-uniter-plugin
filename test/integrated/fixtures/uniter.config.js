/*
 * Webpack-Uniter-Plugin - Webpack plugin for requiring PHP files from JavaScript
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/webpack-uniter-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/webpack-uniter-plugin/raw/main/MIT-LICENSE.txt
 */

module.exports = {
    settings: {
        phpcore: {
            // Set an option to ensure it is compiled into the initialiser.
            myOption: 'my value',
        },
        phpify: {
            include: ['test/integrated/fixtures/**/*.php'],
        },
    },
};
