'use strict';

var path = require('path');

var demos = path.join(__dirname, 'demos');

module.exports = {
  devtool: 'eval',
  entry: {
    index: [path.join(demos, 'index.js')]
  },
  output: {
    path: demos,
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /lib|node_modules/
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: '.eslintrc'
  }
};
