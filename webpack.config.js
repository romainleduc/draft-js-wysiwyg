const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ]
  },
  resolve: {
    alias: {
      // all packages in this monorepo
      '@material-ui/core': path.resolve(__dirname, 'node_modules', '@material-ui/core'),
      '@material-ui/lab': path.resolve(__dirname, 'node_modules', '@material-ui/lab'),
      '@material-ui/icons': path.resolve(__dirname, 'node_modules', '@material-ui/icons'),
      "@material-ui/styles": path.resolve(__dirname, "node_modules", "@material-ui/styles"),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: [
    {
      react: 'react',
      immutable: 'immutable',
      'react-dom': 'react-dom',
      'draft-js': 'draft-js',
    },
    /@material-ui\/.*/
  ]
}