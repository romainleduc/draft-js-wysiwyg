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
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
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
            {
                test: /\.md$/,
                loader: 'raw-loader',
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