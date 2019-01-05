import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';
// import resolve from 'rollup-plugin-node-resolve';

export default {
    input: "src/dmap.js",
    output: {
        file: "builds/dmap-dist.js",
        format: "iife",
        name: "dmap",
    },
    plugins: [
        // resolve(),
        babel(
        {
            babelrc: true,
            presets: ["@babel/preset-env"]
        }
    ), 
    // uglify.uglify()
] 
}