/*
* @Author: Shuhuasong
* @Date:   2020-08-16 13:25:33
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-20 00:10:43
*/
'use strict';
 require('./index.css');
 require('page/common/nav/index.js');
 require('page/common/header/index.js');

 var _mm = require('util/mm.js');
 var _product = require('service/product-service.js');
 var _cart = require('service/cart-service.js');
 var templateIndex = require('./index.string');

  var page = {
    data : {
        productId : _mm.getUrlParam('productId') || '',
    },

    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        //if there is no productId, go home page
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    
    bindEvent: function(){
        var _this = this;
        //Preview Picture
        $(document).on('mouseenter', '.p-img-item',function(){
            var imageUrl  = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        //count 
        $(document).on('click', '.p-count-btn',function(){
            var type      = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount   = $('.p-count'),
                currCount = parseInt($pCount.val()),
                minCount  = 1,
                maxCount  = _this.data.detailInfo.stock || 1;
            if(type==='plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type==='minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }    
        });
        //Add to Cart
        $(document).on('click', '.cart-add',function(){
            _cart.addToCart({
                productId  : _this.data.productId,
                count      : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    //Load product detail
    loadDetail: function(){
        var _this     = this,
            html      = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        //request Detail information
        _product.getProductDetail(this.data.productId,function(res){
            _this.filter(res);
            //cache detail's data
            _this.data.detailInfo = res;
            html = _mm.renderHtml(templateIndex, res);
            //render
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">the product sold out</p>');
        });

    },
    //data matching
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }

};

$(function(){
    page.init();
})
