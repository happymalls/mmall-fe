/*
* @Author: Shuhuasong
* @Date:   2020-08-10 16:54:00
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-11 13:00:13
*/
'use strict';
 require('./index.css');
 require('page/common/nav/index.js');
 require('page/common/header/index.js');
 var navSide  = require('page/common/nav-side/index.js');
 var _mm = require('util/mm.js');
 var _user = require('service/user-service.js');
 var templateIndex = require('./index.string');
 
//Page logic part
 var page = {
    init: function(){
      this.onLoad();
      this.bindEvent();
    },
    onLoad : function(){
     //initial left side menu
     navSide.init({
        name: 'user-center'
     });
     this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        //the event after press the submit button
        $(document).on('click', '.btn-submit', function(){
            var  userInfo = {
                phone    : $.trim($('#phone').val()),
                email    : $.trim($('#email ').val()),
                question : $.trim($('#question').val()),
                answer   : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //update the user information if the formate of userInfo is correct
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    //load user information
    loadUserInfo : function(){
         var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    //validate user information
    validateForm : function(formData){
         var result = {
            status : false,
            msg    : ''
        };
       
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