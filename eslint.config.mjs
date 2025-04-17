/*
 * Webpack-Uniter-Plugin - Webpack plugin for requiring PHP files from JavaScript
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/webpack-uniter-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/webpack-uniter-plugin/raw/main/MIT-LICENSE.txt
 */

import buildbeltConfig from 'buildbelt/eslint.config.mjs';

export default buildbeltConfig.map((config) =>
    Object.assign(config, {
        files: [
            '{src,test}/**/*.{js,jsx,mjs,mts,ts,tsx}',
            '*.{js,jsx,mjs,mts,ts,tsx}',
        ],
    }),
);
