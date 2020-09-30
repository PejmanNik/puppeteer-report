
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const tsconfigOverride = { compilerOptions: { module: 'es2015', declaration: false } };

export default {
    input: './src/core/index.ts',
    output: {
        name: 'core',
        exports: 'named',
        file: 'out/core/bundle.js',
        format: 'iife'
    },
    plugins: [
        typescript({
            tsconfigOverride
        }), resolve(), commonjs(), json(), terser()
    ],
};