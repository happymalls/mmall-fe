/*
* @Author: Shuhuasong
* @Date:   2020-08-11 13:48:32
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-11 14:37:26
*/
'use strict';
 require('./index.css');
 require('page/common/nav/index.js');
 require('page/common/header/index.js');
 var navSide  = require('page/common/nav-side/index.js');
 var _mm = require('util/mm.js');
 var _user = require('service/user-service.js');
 
//Page logic part
 var page = {
    init: function(){
      this.onLoad();
      this.bindEvent();
    },
    onLoad : function(){
     //initial left side menu
     navSide.init({
        name: 'user-pass-update'
     });
    },
    bindEvent : function(){
        var _this = this;
        //the event after press the submit button
        $(document).on('click', '.btn-submit', function(){
            var  userInfo = {
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //update password
                _user.updatePassword({
                    passwordOld  : userInfo.password,
                    passwordNew  : userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        })
    },
   
    //validate user information
    validateForm : function(formData){
         var result = {
            status : false,
            msg    : ''
        };
       
        //check the original password is empty
        if(!_mm.validate(formData.password, 'require')){
            result.msg = 'The original password cannot be empty';
            return result;
        }
         //check new password's length
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = 'the password length need to be greater than 6';
            return result;
        }
         //check question
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = 'two passwords are different';
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