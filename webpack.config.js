'use strict';

var path = require('path');

var src = path.join(__dirname, 'src');

module.exports = {
  devtool: 'sourcemap',
  entry: {
    index: [path.join(src, 'index.js')],
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'console-board.js',
    sourceMapFilename: 'console-board.map',
    library: 'ConsoleBoard',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: src
    }]
  },
  resolve: {
    root: src,
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: '.eslintrc'
  }
};
