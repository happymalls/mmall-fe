/*
* @Author: Shuhuasong
* @Date:   2020-08-05 23:28:28
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-05 23:33:23
*/
'use strict';

var _mm = require('util/mm.js');

var _cart = {
    //Get Shopping Cart number
    getCartCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _cart;