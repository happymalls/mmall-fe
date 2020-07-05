/*
* @Author: Shuhuasong
* @Date:   2020-06-25 02:08:16
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-07-04 22:32:12
*/

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//Environment Virable
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'env';
console.log(WEBPACK_ENV);

//the method to get parameter for : html-webpack-plugin
var getHtmlConfig = function(name){
    return {
      template: './src/view/' + name + '.html',
      filename: 'view/' + name + '.html',
      inject  : true,
      hash    : true,
      chunks  : ['common', name]
    };
};

//webpack config
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
  },
  output: {
    path: './dist',
    publicPath : '/dist',
    filename: 'js/[name].js'
  },
  externals : {
    'jquery' : 'window.jQuery'
  },
  module: {
    loaders: [
        { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader")},
        { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
    ]
},
  plugins: [
    //seperate the common module into js/base.js
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/base.js'
    }),
    //pack the css individually into file
    new ExtractTextPlugin("css/[name].css"),
    // deal with html module
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
  ]
};


if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8080/')
}
module.exports = config;