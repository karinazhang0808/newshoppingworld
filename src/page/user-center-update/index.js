/*
* @Author: JiaoweiZhang
* @Date:   2018-07-19 13:53:11
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-23 14:46:11
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _tl             = require('util/tl.js');
var _user           =require('service/user-service.js');
var templateIndex   = require('./index.string');

//logic parts of page
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //initialize left side menu
        navSide.init({
            name: 'user-center'
        });
        //load user info
        this.loadUserInfo();
    },
    bindEvent :function(){
        var _this =this;
        //after click submit btn
        $(document).on('click','btn-submit',function(){
            var userInfo ={
                phone   : $.trim($('#phone').val()),
                email   : $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer  : $.trim($('#answer').val()),
            },
            validateResult =_this.validateForm(userInfo);
            if(validateResult.status){
                // modify user info
                _user.updateUserInfo(userInfo, function(res, msg){
                    _tl.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _tl.errorTips(errMsg);
                });
            }
            else{
                _tl.errorTips(validateResult.msg);
            }
        });
    },
    //load user infomation
    loadUserInfo :function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _tl.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _tl.errorTips(errMsg);
        });
    },
    //
    validateForm : function(formData){
         var result = {
            status  : false,
            msg     : ''
        };
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