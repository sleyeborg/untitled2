const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: "development",
    entry: './src/libs/index.js',
    output: {
        filename: '[name].[chunk-hash].js',
        path: path.resolve(__dirname, 'dist')

    },
    plugins: [
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['*.js']}),
        new HtmlWebpackPlugin({
            template: './index.html',
            hash : 'true',


        })

    ]


}