const path = require('path');

module.exports = {
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.md$/i,
                loader: 'raw-loader',
            },
            {
                test: /\.(js|mjs|jsx)$/,
                include: /node_modules(\/|\\)(@material-ui(\/|\\))/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceType: 'unambiguous',
                        plugins: [
                            [
                                'babel-plugin-module-resolver',
                                {
                                    alias: {
                                        // all packages in this monorepo
                                        '@material-ui/core':  path.resolve(__dirname, 'node_modules', '@material-ui/core'),
                                        '@material-ui/lab': path.resolve(__dirname, 'node_modules', '@material-ui/lab'),
                                        '@material-ui/icons': path.resolve(__dirname, 'node_modules', '@material-ui/icons'),
                                    },
                                    transformFunctions: ['require'],
                                },
                            ],
                        ],
                    },
                }
            },
        );
        return config
    },
}
