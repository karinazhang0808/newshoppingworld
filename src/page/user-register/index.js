/*
* @Author: JiaoweiZhang
* @Date:   2018-07-11 16:32:38
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-11 16:56:57
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _tl     = require('util/tl.js');

// error msg in form
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

//logic parts of page
var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // verify username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            // If username is blank,no need to verify
            if(!username){
                return;
            }
            // asynchronous validation about if username is exist
            _user.checkUsername(username, function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            });
        });
        // click register button 
        $('#submit').click(function(){
            _this.submit();
        });
        // press enter to submit
        $('.user-content').keyup(function(e){
            // keyCode == 13 means enter
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // submit form
    submit : function(){
        var formData = {
                username        : $.trim($('#username').val()),
                password        : $.trim($('#password').val()),
                passwordConfirm : $.trim($('#password-confirm').val()),
                phone           : $.trim($('#phone').val()),
                email           : $.trim($('#email').val()),
                question        : $.trim($('#question').val()),
                answer          : $.trim($('#answer').val())
            },
            // form validation results
            validateResult = this.formValidate(formData);
        // validation succeeds
        if(validateResult.status){
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // validation fails
        else{
            // error message
            formError.show(validateResult.msg);
        }

    },
    // form fields validation
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // verify whether username is null
        if(!_tl.validate(formData.username, 'require')){
            result.msg = 'Please enter your username';
            return result;
        }
        // verify whether password is null
        if(!_tl.validate(formData.password, 'require')){
            result.msg = 'Please enter your password';
            return result;
        }
        // verify whether the length of password is less than 6
        if(formData.password.length < 6){
            result.msg = 'Your password‘length must be greater than 6 characters';
            return result;
        }
        // verify whether two passwords are both consistent
        if(formData.password !== formData.passwordConfirm){
            result.msg = 'The two passwords you typed do not match';
            return result;
        }
        // verify phone number
        if(!_tl.validate(formData.phone, 'phone')){
            result.msg = 'Incorrect phone format';
            return result;
        }
        // verify the format of email
        if(!_tl.validate(formData.email, 'email')){
            result.msg = 'Incorrect email format';
            return result;
        }
        // verify whether security question is null
        if(!_tl.validate(formData.question, 'require')){
            result.msg = 'Security question cannot be empty';
            return result;
        }
        // verify whether answer of security question is null
        if(!_tl.validate(formData.answer, 'require')){
            result.msg = 'Answer cannot be empty';
            return result;
        }
        // If pass validation，return correct remind
        result.status   = true;
        result.msg      = 'validate succeeds';
        return result;
    }
};
$(function(){
    page.init();
});