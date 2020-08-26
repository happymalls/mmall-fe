
/*
* @Author: Shuhuasong
* @Date:   2020-06-25 02:08:16
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-22 21:00:10
*/

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//Environment Virable dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
//console.log(WEBPACK_ENV);

//the method to get parameter for : html-webpack-plugin
var getHtmlConfig = function(name, title){
    return {
      template: './src/view/' + name + '.html',
      filename: 'view/' + name + '.html',
      title   : title,
      inject  : true,
      hash    : true,
      chunks  : ['common', name]
    };
};

//webpack config
var config = {
  entry: {
    'common'             : ['./src/page/common/index.js'],
    'index'              : ['./src/page/index/index.js'],
    'list'               : ['./src/page/list/index.js'],
    'detail'             : ['./src/page/detail/index.js'],
    'cart'               : ['./src/page/cart/index.js'],
    'user-login'         : ['./src/page/user-login/index.js'],
    'user-register'      : ['./src/page/user-register/index.js'],
    'user-pass-reset'    : ['./src/page/user-pass-reset/index.js'],
    'user-center'        : ['./src/page/user-center/index.js'],
    'user-center-update' : ['./src/page/user-center-update/index.js'],
    'user-pass-update'   : ['./src/page/user-pass-update/index.js'],
    'result'             : ['./src/page/result/index.js'],
  },
  output: {
    path: './dist',
    publicPath : '/dist',
    // path    : __dirname + '/dist',
    // publicPath : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
    filename: 'js/[name].js'
  },
  externals : {
    'jquery' : 'window.jQuery'
  },
  module: {
    loaders: [
        { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader")},
        { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
        { test: /\.string$/, loader: 'html-loader'}
    ]
},

  resolve : { //simplify the path
    alias : {
        node_modules : __dirname + '/node_modules',
        util : __dirname + '/src/util',
        page : __dirname + '/src/page',
        service : __dirname + '/src/service',
        image : __dirname + '/src/image'
    }
  },

  devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                target: 'http://test.happymmall.com',
                changeOrigin : true
            }
        }
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
    new HtmlWebpackPlugin(getHtmlConfig('index', 'Home')),
    new HtmlWebpackPlugin(getHtmlConfig('list', 'Product List')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', 'Product Detail')),
    new HtmlWebpackPlugin(getHtmlConfig('cart', 'Cart')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','Login')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','Registration')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','Find Password')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','Personal Information Center')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','Update Personal Information')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','Update Password')),
    new HtmlWebpackPlugin(getHtmlConfig('result','Result')),
  ]
};


if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8080/')
}
module.exports = config;