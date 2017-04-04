var webpack = require('webpack');

module.exports = {
    entry: "./src/demo",
    output: {
        path: __dirname,
        filename: 'demo.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false
        })
    ],
    module: {
        loaders: [
            {test: /demo.js/, loaders: ['babel-loader']}
        ]
    }
};