/*
* @Author: Shuhuasong
* @Date:   2020-08-10 16:44:16
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-10 18:18:41
*/
'use strict';
 require('./index.css');
 require('page/common/nav/index.js');
 require('page/common/header/index.js');
 var navSide  = require('page/common/nav-side/index.js');
 var _mm = require('util/mm.js');
 var _user = require('service/user-service.js');
 var templateIndex = require('./index.string');


//Page logic part
 var page = {
    init: function(){
      this.onLoad();
    },
    onLoad : function(){
     //initial left side menu
     navSide.init({
        name: 'user-center'
     });
     this.loadUserInfo();
    },
    //load user information
    loadUserInfo : function(){
         var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        })
    }
   
 };
 $(function(){
    page.init();
 });