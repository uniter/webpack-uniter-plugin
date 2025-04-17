/*
 * Webpack-Uniter-Plugin - Webpack plugin for requiring PHP files from JavaScript
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/webpack-uniter-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/webpack-uniter-plugin/raw/main/MIT-LICENSE.txt
 */

import { expect } from 'chai';
import * as webpack from 'webpack';
import { join } from 'path';
import { mkdirSync, rmSync } from 'fs';
// Import from the package root so that we test the built version.
import UniterPlugin from '../..';

describe('Webpack-Uniter-Plugin integration', () => {
    const outputPath = join(__dirname, '../../var/test');
    const entryPath = join(__dirname, 'fixtures', 'entry.js');
    const outputFile = join(outputPath, 'bundle.js');

    beforeEach(() => {
        // Clean up output directory.
        rmSync(outputPath, { recursive: true, force: true });
        mkdirSync(outputPath, { recursive: true });
    });

    it('should compile and execute PHP modules correctly', async function () {
        // Allow extra time for the compilation to complete.
        this.timeout(10000);

        const compiler = webpack.webpack({
            mode: 'development',
            entry: entryPath,
            output: {
                path: outputPath,
                filename: 'bundle.js',
                library: {
                    type: 'commonjs2',
                },
            },
            plugins: [new UniterPlugin()],
            resolve: {
                extensions: ['.js', '.php'],
            },
        });

        // Run webpack compilation.
        await new Promise<void>((resolve, reject) => {
            compiler.run(
                (err: Error | null, stats: webpack.Stats | undefined) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (stats?.hasErrors()) {
                        reject(new Error(stats.toString()));
                        return;
                    }
                    resolve();
                },
            );
        });

        // Read and evaluate the compiled output.
        const resultValue = await import(outputFile);

        // Verify the PHP module was executed correctly.
        expect(resultValue.getNative()).to.equal(21);
    });
});
