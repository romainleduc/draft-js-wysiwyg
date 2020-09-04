const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    optimization: {
        minimize: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'draft-js-wysiwyg.min.js',
        library: 'DraftJsWysiwyg',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}