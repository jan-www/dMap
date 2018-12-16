import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';


export default {
    input: "src/dmap.js",
    output: {
        file: "builds/dmap-dist.js",
        format: "iife",
        name: "dmap"
    },
    plugins: [babel(
        {
            babelrc: true,
            presets: ["@babel/preset-env"]
        }
    ), 
    // uglify.uglify()
] 
}