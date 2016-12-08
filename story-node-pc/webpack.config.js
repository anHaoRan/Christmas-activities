var webpack = require('webpack');
var path = require('path');
var config = require('./config');
console.log(process.env.NODE_ENV);
module.exports = {
  debug: false,

  entry: './src',

  output: {
    path: path.join(__dirname, '../story-static/build/'),
    filename: 'app.js',
    publicPath: config.cdn + '/build/',
    chunkFilename: "[name].min.js?" + (new Date - 0)
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
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify(process.env.NODE_ENV) 
       }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      }
    })
  ]
}