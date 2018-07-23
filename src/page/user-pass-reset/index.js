/*
* @Author: JiaoweiZhang
* @Date:   2018-07-18 12:32:14
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-18 13:22:41
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _tl     = require('util/tl.js');

// error message
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// logic part of page 
var page = {
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : ''
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
        // enter username and click
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            // if username exist
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // if username not exist
            else{
                formError.show('Please enter your username');
            }
        });
        // Enter answer of security question
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            // if the answer exists
            if(answer){
                // check the answer
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                }, function(res){
                    _this.data.answer   = answer;
                    _this.data.token    = res;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // if username not exist
            else{
                formError.show('Please enter the answer of the security question');
            }
        });
        //
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            // password cannot be empty
            if(password && password.length >= 6){
                // check answer
                _user.resetPassword({
                    username        : _this.data.username,
                    passwordNew     : password,
                    forgetToken     : _this.data.token
                }, function(res){
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // if password is null
            else{
                formError.show('The new pass cannot be less than 6 characters');
            }
        });
        
    },
    // load unsername
    loadStepUsername : function(){
        $('.step-username').show();
    },
    // load security question
    loadStepQuestion : function(){
        // clear err msg
        formError.hide();
        // switch from one container type to another
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // load password
    loadStepPassword : function(){
        // clear err msg
        formError.hide();
        // switch from one container type to another
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
    
};
$(function(){
    page.init();
});
