var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./src/app.jsx', 'webpack-hot-middleware/client']
    },
    devServer: {
        inline: true,
        port: 8888
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=react-hmre'],
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};