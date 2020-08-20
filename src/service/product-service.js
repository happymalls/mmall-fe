/*
* @Author: Shuhuasong
* @Date:   2020-08-13 23:44:53
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-19 00:37:44
*/
'use strict';

var _mm = require('util/mm.js');

var _product = {

    //get product list
     getProductList : function(listParam,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    //get product detail
     getProductDetail : function(productId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId: productId
            },
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _product;