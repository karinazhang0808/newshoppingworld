/*
* @Author: JiaoweiZhang
* @Date:   2018-07-23 15:27:52
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-23 15:56:27
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _tl             = require('util/tl.js');
var _user           =require('service/user-service.js');

//logic parts of page
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //initialize left side menu
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent :function(){
        var _this =this;
        //after click submit btn
        $(document).on('click','btn-submit',function(){
            var userInfo = {
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            },
            validateResult =_this.validateForm(userInfo);
            if(validateResult.status){
                // modify user password
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function(res, msg){
                    _tl.successTips(msg);
                }, function(errMsg){
                    _tl.errorTips(errMsg);
                });
            }
            else{
                _tl.errorTips(validateResult.msg);
            }
        });
    },
    //
    validateForm : function(formData){
         var result = {
            status  : false,
            msg     : ''
        };
        // Verify old password
        if(!_mm.validate(formData.password, 'require')){
            result.msg = 'Old password cannot be empty';
            return result;
        }
        // Verify the length of the password
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = 'The length of your new password cannot be less than 6 characters';
            return result;
        }
        // Verify if two passwords are the same
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = 'Your password and confirmation password do not match';
            return result;
        }
        // Validation success 
        result.status   = true;
        result.msg      = '';
        return result;
    }
};
$(function(){
    page.init();
});