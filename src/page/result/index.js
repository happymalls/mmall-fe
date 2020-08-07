/*
* @Author: Shuhuasong
* @Date:   2020-08-06 23:21:42
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-06 23:53:54
*/

 'use strict';
 require('./index.css');
 require('page/common/nav-simple/index.js');
 var _mm = require('util/mm.js');

 $(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
        //show the corresponding tip component
        $element.show();
 })

 