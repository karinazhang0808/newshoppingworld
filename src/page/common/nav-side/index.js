/*
* @Author: JiaoweiZhang
* @Date:   2018-07-04 14:28:46
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-23 15:36:00
*/
'use strict';
require('./index.css');
var _tl = require('util/tl.js');
var templateIndex =require('./index.string')
//side-navigation
var navSide = {
    option : {
        name :'',
        navList :[
            {name: 'user-center', desc: 'My Account',       href: './user-center.html'},
            {name: 'order-list', desc: 'My Order',         href: './order-list.html'},
            {name: 'pass-update', desc: 'Change Password',  href: './user-pass-update.html'},
            {name: 'about', desc: 'About NSWD',       href: './about.html'}
        ]
    },
    init : function(option){
        //combine option
        $.extend(this.option, option);
        this.renderNav();
    }, 
    //render navigation menu
    renderNav : function(){
        //calculate acctive data
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive =true;
            }
        };
        //render list data
        var navHtml = _tl.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        //put html into
        $('.nav-side').html(navHtml);
    }    
};

module.exports = navSide;