'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Temporary fix for css-loader/post-css
// 'Module build failed: ReferenceError: Promise is not defined'
require('babel/polyfill');

var webpack = require('webpack');
var path = require('path');

var loaders = ['babel'];
var port = process.env.PORT || 4040;

var devtool;
var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];
var entry = {
  '00-simple-transition': './demos/00-simple-transition/index.js',
  '01-appear-disappear': './demos/01-appear-disappear/index.js',
  '02-carousel-simple': './demos/02-carousel-simple/index.js',
  '03-carousel-lazy': './demos/03-carousel-lazy/index.js',
};

if (process.env.NODE_ENV === 'development') {
  devtool ='eval-source-map';
  loaders = ['react-hot'].concat(loaders);
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
  entry = Object.keys(entry).reduce(function (result, key) {
    result[key] = [
      'webpack-dev-server/client?http://0.0.0.0:' + port,
      'webpack/hot/only-dev-server',
      entry[key]
    ];
    return result;
  }, {});
} else {
  devtool ='source-map';
  plugins = plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin()
  ]);
}

module.exports = {
  devtool: devtool,
  entry: entry,
  output: {
    filename: '[name]/all.js',
    publicPath: '/demos/',
    path: __dirname + '/demos/',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /build|lib|bower_components|node_modules/,
      loaders: loaders
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }],
    // preLoaders: [
    //   {test: /\.jsx?$/, loader: 'eslint', exclude: /build|lib|bower_components|node_modules/},
    // ],
    noParse: [
      path.join(__dirname, 'node_modules', 'babel-core', 'browser.min.js')
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins,
  eslint: {configFile: '.eslintrc'},
};
