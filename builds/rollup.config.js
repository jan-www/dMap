import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';


export default {
    input: "src/dmap.js",
    output: {
        file: "builds/dmap-dist.js",
        format: "cjs",
    },
    plugins: [babel(
        {
            babelrc: true,
            presets: ["@babel/preset-env"]
        }
    )] 
}