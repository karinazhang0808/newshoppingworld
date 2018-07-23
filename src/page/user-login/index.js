/*
* @Author: JiaoweiZhang
* @Date:   2018-06-04 12:19:05
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-11 16:50:01
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _tl     = require('util/tl.js');

//error msg in form
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(errMsg){
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
        //click login button
        $('#submit').click(function(){
            _this.submit();
        });
        //click enter to submit
        $('.user-content').keyup(function(e){
            //KeyCode ==13 means enter 
            if (e.keyCode === 13){
                _this.submit();
            }
        });
    },
    //submit form
    submit : function(){
        var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            },
            //form validate result
            validateResult = this.formValidate(formData);
        //validation succeeds
        if(validateResult.status){
            //submit
            _user.login(formData, function(res){
                window.location.href = _tl.getUrlParam('redirect') || './index.html';
            }, function(errMsg){         
                formError.show(errMsg);
            });
        }
        //validation fails
        else{
                //error message
                formError.show(validateResult.msg);
        }

    },
    // form fields validation
    formValidate :function(formData){
        var result = {
            status  :false,
            msg     :''
        };
        if (!_tl.validate(formData.username, 'require')) {
            result.msg = 'Please enter your username';
            return result;
        }
        if (!_tl.validate(formData.password, 'require')) {
            result.msg = 'Please enter your password';
            return result;
        }
        // If pass validation，return correct remind
        result.status = true;
        result.msg    ='validation succeeds';
        return result;
    }
};
$(function(){
    page.init();
});