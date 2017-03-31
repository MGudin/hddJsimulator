var path = require('path');
var webpack = require('webpack');

libhdd = {
    entry: './src/libhdd/index.js',
    devtool: "cheap-eval-source-map",
    output: {
        library: 'libhdd',
        filename: 'libhdd.js',
        path: path.resolve(__dirname, 'public/dist')
    }
};

app = {
    entry: {
        app: './src/app.js',
        vendor: ['mithril']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/dist')
    },
    devtool: "cheap-eval-source-map",
    plugins: [
        new webpack.ProvidePlugin({ m: "mithril" }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // Specify the common bundle's name.
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
    }
};

module.exports = [app, libhdd];
