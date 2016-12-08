var webpack = require('webpack');
var path = require('path');
module.exports = {
  devtool: 'inline-source-map',

  debug: true,

  entry: './src',

  output: {
    path: path.join(__dirname, './public/build/'),
    filename: 'app.js',
    publicPath: '/build/',
    chunkFilename: "[name].[hash].js"
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel']}
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js')
  ]
}