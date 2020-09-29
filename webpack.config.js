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
        ]
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.(js|jsx)$/,
    //             exclude: /node_modules/,
    //             use: 'babel-loader',
    //         },
    //     ]
    // },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    externals: {
        react: 'react',
        immutable: 'immutable',
        'react-dom': 'react-dom',
        'draft-js': 'draft-js',
        '@material-ui/core': '@material-ui/core',
        '@material-ui/icons': '@material-ui/icons',
    },
}