/*
* @Author: Shuhuasong
* @Date:   2020-08-06 13:40:19
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-06 14:57:48
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');

//common page header
var header = {
    init : function(){
      this.bindEvent();
    },
    //
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        //if keyword exist, then fill the input box
        if(keyword){
            $('#search-input').val(keyword)
        };
    },
    //submit
    bindEvent : function(){
      var _this = this;
      //After click the button, submit searching
      $('#search-btn').click(function(){
          _this.searchSubmit();
      });
      //press the 'return', submit searching
      $('#search-input').keyup(function(e){
        //13 is the keyCode for 'return'
         if(e.keyCode===13){
            _this.searchSubmit();
         }
      });
    },
    //submit the searching
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //if there is keyword when submit,it will go to 'list' page
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        //if the keyword is empty, go back to home page
        else{
           _mm.goHome(); 
        }   
    }
};

header.init();