/*
* @Author: Shuhuasong
* @Date:   2020-08-22 21:01:19
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-22 23:29:14
*/
'use strict';
 require('./index.css');
 require('page/common/nav/index.js');
 require('page/common/header/index.js');

 var _mm = require('util/mm.js');
 var _cart = require('service/cart-service.js');
 var templateIndex = require('./index.string');

  var page = {
    data : {
        
    },

    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        //if there is no productId, go home page
        this.loadCart();
    },
    
    bindEvent: function(){
        var _this = this;
        //Preview Picture
        // $(document).on('mouseenter', '.p-img-item',function(){
        //     var imageUrl  = $(this).find('.p-img').attr('src');
        //     $('.main-img').attr('src', imageUrl);
        // });
        
    },
    //Load product detail
    loadCart: function(){
        var _this     = this,
            html      = '',
            $pageWrap = $('.page-wrap');
       // $pageWrap.html('<div class="loading"></div>');
        
    },
    //data matching
    filter : function(data){
       
    }

};

$(function(){
    page.init();
})