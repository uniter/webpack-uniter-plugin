/*
 * Webpack-Uniter-Plugin - Webpack plugin for requiring PHP files from JavaScript
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/webpack-uniter-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/webpack-uniter-plugin/raw/main/MIT-LICENSE.txt
 */

import { Compiler, ProvidePlugin } from 'webpack';

export default class UniterPlugin {
    public apply(compiler: Compiler): void {
        Object.assign(
            compiler.options.resolve.fallback ??
                (compiler.options.resolve.fallback = {}),
            {
                'path': require.resolve('path-browserify/'),
                'util': require.resolve('util/'),
            },
        );

        compiler.options.module.rules.push({
            test: /\.php$/,
            use: 'uniter-loader',
        });

        compiler.options.plugins.push(
            new ProvidePlugin({
                // "process" global is expected by "util" polyfill,
                // see https://github.com/browserify/node-util/issues/57.
                process: 'process/browser',
            }),
        );
    }
}
