/*
* @Author: Shuhuasong
* @Date:   2020-07-07 17:33:12
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-07 15:28:37
*/

'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};

//define a tool
var _mm = {
    //internet request
   request : function(param){//request backend data
        var _this = this;
        $.ajax({
            type     : param.method  || 'get', //get or post method
            url      : param.url     || '',
            dataType : param.type    || 'json',
            data     : param.data    || '',
            success  : function(res){ 
                // request successfully
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //no login status, need to enforce login
                else if(10 === res.status){
                    _this.doLogin();
                }
                //the request data is wrong
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error    : function(err){
                typeof param.error === 'function' && param.error(err.statusText);     
            }
        });
   },
   //get server address
   getServerUrl : function(path){
    return conf.serverHost + path;
   },
   //get url parameter
   getUrlParam : function(name){
    //happymmall.com/product/list?keyword=xxx&page=1
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg); //substr(1): remove '?'
    return result ? decodeURIComponent(result[2]) :  null;
   },
    //fill the html template
    renderHtml : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    //Request Success Tip
    successTips : function(msg){
        alert(msg || 'Operation Successfully');
    },

    errorTips : function(msg){
        alert(msg || 'Something Wrong');
    },
    // Validate if the input is empty, is cellphone or email
    validate : function(value, type){
     var value = $.trim(value);
     //Empty validate
     if('require'===type){
        return !!value;
     }
     //cellphone validate
     if('phone'===type){
        return /^1\d{10}$/.test(value);
     }
     //email validate
     if('email'===type){
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
     }
    },

   //Unify the login
   doLogin  : function(){
    window.location.href = './user-login.html?redirect =' + encodeURIComponent(window.location.href);
   },
   //go Home page
   goHome : function(){
    window.location.href = './index.html';
   }
};

module.exports = _mm;