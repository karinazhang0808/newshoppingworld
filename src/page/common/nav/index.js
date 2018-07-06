/*
* @Author: JiaoweiZhang
* @Date:   2018-07-04 15:05:15
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-04 20:30:13
*/

'use strict';
require('./index.css');
var _tl = require('util/tl.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
//navigation
var nav ={
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent   : function(){
        //login click event
        $('.js-login').click(function(){
            _tl.dologin();
        });
        //signup click event
        $('.js-register').click(function(){
            window.location.href ='./register.html';
        });
        //signout click event
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            }, function(errMsg){
                _tl.errorTips(errMsg);
            });
        });
    }, 
    //loading user info
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().sibling('.user.login').show()
                .find('.username').text(res.username);
            }, function(errMsg){
                // do nothing
            });
    },
    //loading numbers in cart
    loadCartCount : function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
            }, function(errMsg){
            $('.nav .cart-count').text(0);
            });        
    }
};

module.exports = nav.init();