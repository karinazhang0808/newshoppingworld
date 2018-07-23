/*
* @Author: JiaoweiZhang
* @Date:   2018-07-04 19:59:27
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-22 16:20:24
*/

'use strict';

var _tl = require('util/tl.js');

var _user = {
    //user login
    login: function(userInfo,resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // Check username
    checkUsername : function(username, resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/check_valid.do'),
            data    : {
                type    :'username',
                str     : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // user register
    register : function(userInfo, resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //check status
    checkLogin: function(resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/get-user-info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // Get user account security question
    getQuestion : function(username, resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // Check answers of security questions
    checkAnswer : function(userInfo, resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // reset password
    resetPassword : function(userInfo, resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // Get user info
    getUserInfo : function(resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // Update personal info
    updateUserInfo : function(userInfo, resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // Update password under login status
    updatePassword : function(userInfo, resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    
    //logout
    logout : function(resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   :reject
        });
    }
}
module.exports = _user;