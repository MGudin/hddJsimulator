var path = require('path');

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
    devtool: 'source-map'
};

module.exports = [libhdd, app];
