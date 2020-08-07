/*
* @Author: Shuhuasong
* @Date:   2020-08-05 23:03:56
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-05 23:22:21
*/
'use strict';

var _mm = require('util/mm.js');

var _user = {

    //Check Login Status
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

    //Logout
    logout : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}

module.exports = _user;