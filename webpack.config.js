const modoDev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const path = require('node:path')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        static: {
            directory: path.join(__dirname, "build"),
        },
        compress: true,
        port: 9000
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/build'
    },
    optimization: {
        minimizer: [
            new CSSMinimizerWebpackPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'estilo.css' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: '**/*.html', to: __dirname + '/build/', context: 'src' },
                { from: 'imgs/**/*', to: __dirname + '/build/', context: 'src' }
            ]
        })
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }, {
            test: /.(ttf|otf|eot|svg|woff(2)?)$/,
            use: ['file-loader']
        }]
    }
};