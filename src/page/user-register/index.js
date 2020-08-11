/*
* @Author: Shuhuasong
* @Date:   2020-08-08 13:01:41
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-08 14:06:54
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
        //varify the username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            //if username if empty, non-checking
            if(!username){
                return;
            }
            _user.checkUsername(username, function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            });
        });
        //Click Event for 'register button'
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
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val()) 
        },
        //form validate result
        validateResult = this.formValidate(formData);
        //validate success
        if(validateResult.status){
            _user.register(formData, function(res){//redirect: go back to original url, if it is empty, go back go index.html
                window.location.href = './result.html?type=register';
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
        //check if the username is empty
        if(!_mm.validate(formData.username, 'require')){
            result.msg = 'Username cannot be empty';
            return result;
        }
        //check if the password is empty
        if(!_mm.validate(formData.password, 'require')){
            result.msg = 'Password cannot be empty';
            return result;
        }
        //check the password's length
        if(formData.password.length < 6){
            result.msg = 'Password length cannot be less than 6 ';
            return result;
        }
        //check if two password are the same
        if(formData.password !== formData.passwordConfirm){
            result.msg = 'The two password are different';
            return result;
        }
        //check phone number
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = 'The phone number format is wrong';
            return result;
        }
        //check email
        if(!_mm.validate(formData.email, 'email')){
            result.msg = 'the email format is wrong';
            return result;
        }
         //check question
        if(!_mm.validate(formData.question, 'require')){
            result.msg = 'Question cannot be empty';
            return result;
        }
        //check answer
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = 'Answer cannot be empty';
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