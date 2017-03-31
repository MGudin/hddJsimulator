var path = require('path');
var webpack = require('webpack');

libhdd = {
    entry: './src/libhdd/index.js',
    devtool: 'source-map',
    output: {
        library: 'libhdd',
        filename: 'libhdd.js',
        path: path.resolve(__dirname, 'dist')
    }
};

app = {
    entry: {
        app: './src/app.js',
        vendor: ['mithril']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({ m: "mithril" }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // Specify the common bundle's name.
        })
    ]
};

module.exports = [libhdd, app];
