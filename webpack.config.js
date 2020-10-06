const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    optimization: {
        minimize: false,
    },
    output: {
        path: path.resolve('lib'),
        filename: 'index.js',
        library: 'draftJsWysiwyg',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    externals: {
        react: 'react',
        immutable: 'immutable',
        'react-dom': 'react-dom',
        '@material-ui/core': '@material-ui/core',
        '@material-ui/icons': '@material-ui/icons',
    },
}