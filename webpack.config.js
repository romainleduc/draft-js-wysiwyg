const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    optimization: {
        minimize: false,
    },
    output: {
        path: path.resolve('lib'),
        filename: 'draft-js-wysiwyg.js',
        library: 'draftJsWysiwyg',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: {
        react: 'react',
        immutable: 'immutable',
        'react-dom': 'react-dom',
        'draft-js': 'draft-js',
    },
}