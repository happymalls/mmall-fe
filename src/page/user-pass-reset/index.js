/*
* @Author: Shuhuasong
* @Date:   2020-08-08 19:15:07
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-08 20:47:08
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
    data : {
        username : '',
        password : '',
        answer   : '',
        token    : ''
    },
    init: function(){
      this.onLoad();
      this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        //Click Event for 'login button'
        $('#submit-username').click(function(){
           var username = $.trim($('#username').val());
           //exist username
           if(username){
             _user.getQuestion(username, function(res){
                _this.data.username = username;
                _this.data.question = res;
                _this.loadStepQuestion();
             }, function(errMsg){
                formError.show(errMsg);
             });
           }
           //not exist username
           else{
            formErro.show('Please enter your username');
           }
        });
         //Click Event after enter the password question
        $('#submit-question').click(function(){
           var answer = $.trim($('#answer').val());
           //exist password question
           if(answer){
            //check the correct of password question
             _user.checkAnswer({
                username : _this.data.username,
                question : _this.data.question,
                answer   : answer
             }, function(res){
                _this.data.answer = answer;
                _this.data.token = res;
                _this.loadStepPassword();
             }, function(errMsg){
                formError.show(errMsg);
             });
           }
           //not exist username
           else{
            formErro.show('Please enter your password question');
           }
        });
       
           //Click Event after enter the password 
        $('#submit-password').click(function(){
           var password = $.trim($('#password').val());
           //exist password 
           if(password && password.length >= 6){
            //check the correct of password question
             _user.resetPassword({
                username      : _this.data.username,
                passwordNew   : password,
                forgetToken   : _this.data.token
             }, function(res){
                window.location.href = './result.html?type=pass-reset';
             }, function(errMsg){
                formError.show(errMsg);
             });
           }
           //password is empty
           else{
            formErro.show('Please enter your new password with length greater than 6 ');
           }
        });

    },
    //Load the input username
    loadStepUsername : function(){
      $('.step-username').show();
    },
    //Load the input Password question
    loadStepQuestion : function(){
      //hide the error tip
      formError.hide();
      //swift container
       $('.step-username').hide()
       .siblings('.step-question').show()
       .find('.question').text(this.data.question);
    },
    //Load the passwordd
    loadStepPassword : function(){
       //hide the error tip
      formError.hide();
      //swift container
       $('.step-question').hide()
       .siblings('.step-password').show();   
    }

 };
 $(function(){
    page.init();
 });