/*
* @Author: JiaoweiZhang
* @Date:   2018-07-19 13:24:32
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-22 14:42:00
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
    },
    onLoad : function(){
        //initialize left side menu
        navSide.init({
            name: 'user-center'
        });
        //load user info
        this.loadUserInfo();
    },
    //load user infomation
    loadUserInfo :function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _tl.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        },function(errMsg){

        });
    }
};
$(function(){
    page.init();
});