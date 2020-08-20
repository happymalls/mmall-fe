/*
* @Author: Shuhuasong
* @Date:   2020-06-29 13:55:49
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-13 21:33:10
*/

'use strict';
 require('./index.css');
 require('page/common/nav/index.js');
 require('page/common/header/index.js');
 require('util/slider/index.js');
 var navSide        = require('page/common/nav-side/index.js');
 var templateBanner = require('./banner.string');
 var _mm            = require('util/mm.js');

 $(function() {
    //fill the banner's html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //initial banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    //the prev and next button event binding
    $('.banner-con .banner-arrow').click(function(){
       var forward = $(this).hasClass('prev') ? 'prev' : 'next';
       $slider.data('unslider')[forward]();
    });
});

 