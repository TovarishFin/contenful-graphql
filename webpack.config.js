const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const root = x => path.join(__dirname, x);

module.exports = {
  entry: root('src/index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    path: root('dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/*.+(html|css|png)',
        flatten: true,
      },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
