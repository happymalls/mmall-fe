/*
* @Author: Shuhuasong
* @Date:   2020-06-29 13:52:41
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-08 02:39:01
*/
 'use strict';
 require('./index.css');
 require('page/common/nav-simple/index.js');
 var _user = require('service/user-service.js');
 var _mm = require('util/mm.js');
 //The error tip in form
 var formError = {
    show : function(errMsg){
      $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
      $('.error-item').hide().find('.err-msg').text('');
    }
 };
//Page logic part
 var page = {
    init: function(){
      this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //Click Event for 'login button'
        $('#submit').click(function(){
            _this.submit();
        });
        //if press 'enter', also submit
        $('.user-content').keyup(function(e){
            //keyCode == 13, means 'enter'
            if(e.keyCode===13){
                _this.submit();
            }
        })
    },
    submit: function(){
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
        //form validate result
        validateResult = this.formValidate(formData);
        //validate success
        if(validateResult.status){
            _user.login(formData, function(res){//redirect: go back to original url, if it is empty, go back go index.html
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        //validate fail
        else{
            //error tip
            formError.show(validateResult.msg);
        }
    },
    //Validate the input of Form
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = 'Username cannot be empty';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = 'Password cannot be empty';
            return result;
        }
        result.status = true;
        result.msg    = 'Pass Validation';
        return result;
    }
 };
 $(function(){
    page.init();
 });