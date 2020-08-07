/*
* @Author: Shuhuasong
* @Date:   2020-08-05 18:09:42
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-05 23:34:28
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
//navigation
var nav = {
    init : function(){
      this.bindEvent();
      this.loadUserInfo();
      this.loadCartCount();
      return this; //链式操作
    },
    bindEvent : function(){
      //login click event
       $('.js-login').click(function(){
           _mm.doLogin();
       });
       //register click event
       $('.js-register').click(function(){
        window.location.href = './register.html';
       });
       //logout click event
        $('.js-logout').click(function(){
         _user.logout(function(res){
            window.location.reload();
         }, function(errMsg){
            _mm.errorTips(errMsg);
         });
       });
    },
    //load user information
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().sibling('.user.login').show()
            .find('.username').text(res.username);

         }, function(errMsg){
            //doing nothing
         });
    },
    //load shopping cart number
    loadCartCount: function(){
       _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
         }, function(errMsg){
            $('.nav .cart-count').text(0);
         });
    }
};

module.exports = nav.init();