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
                    '@material-ui/core': path.resolve(__dirname, 'node_modules', '@material-ui/core'),
                    '@material-ui/lab': path.resolve(__dirname, 'node_modules', '@material-ui/lab'),
                    '@material-ui/icons': path.resolve(__dirname, 'node_modules', '@material-ui/icons'),
                    "@material-ui/styles": path.resolve(__dirname, "node_modules", "@material-ui/styles"),
                  },
                  transformFunctions: ['require'],
                },
              ],
            ],
          },
        }
      },
    );

    // config.plugins.push(
    //   // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
    //   new BundleAnalyzerPlugin({
    //     analyzerMode: 'server',
    //     generateStatsFile: true,
    //     // Will be available at `.next/stats.json`
    //     statsFilename: 'stats.json',
    //   }),
    // )
    return config
  },
}
