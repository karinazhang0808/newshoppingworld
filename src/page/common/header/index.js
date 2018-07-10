/*
* @Author: JiaoweiZhang
* @Date:   2018-07-09 12:24:16
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-09 13:13:47
*/

'use strict';
require('./index.css');

var _tl = require('util/tl.js');
//header
var header ={
    init    : function(){
        this.bindEvent();
    },
    onLoad  : function(){
        var keyword=_tl.getUrlParam('keyword');
        //If keyword exist ,then input 
        if (keyword) {
            $('#search-input').val(keywors);
        };
    },
    bindEvent : function(){
        var _this = this;
        //clicl search btn,then submit search content
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //click enter, then submit search content
        $('#search-input').keyup(function(e){
            //13 is the keycode of enter
            if(e.keyCode ===13){
                _this.searchSubmit();
            }
        })
    },
    //submit search content
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //if there is a keyword when submit the search content,then jump to the list page
        if (keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _tl.goHome();
        }
    }
};

header.init();