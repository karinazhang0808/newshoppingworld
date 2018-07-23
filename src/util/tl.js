/*
* @Author: JiaoweiZhang
* @Date:   2018-07-03 10:42:10
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-11 12:32:56
*/

'use strict';
var Hogan = require('hogan.js');
var conf ={
    serverHost :''
};
var _tl ={
    //Network request
    request : function(param){
        var _this =this;
        $.ajax({
            type     : param.method || 'get',
            url      : param.url    ||'',
            dataType : param.type   ||'json',
            data     : param.data   ||'',
            success    : function(res){
                //request success
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // no login status,need a forcible login
                else if(10 === res.status){
                    _this.doLogin();
                }
                //Request Data error
                else if(1 === res.status){
                     typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error    : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //get address of server
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //get url param
    getUrlParam  : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //render html template
    renderHtml : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate),
            result   = template.render(data);
        return result;
    },
    //success tips
    successTips : function(msg){
        alert(msg || 'success');
    },
    //error tips
    errorTips   : function(msg){
        alert(msg ||'something is wrong')
    },
    //verification
    validate    :function(value, type){
        var value = $.trim(value);
        //null vertification
        if('require'=== type){
            return!!value;
        }
        //phone vertification
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //email format vertification
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //uniform login process
    doLogin : function(){
        window.location.href ='./user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome  : function(){
        window.location.href = './index.html';
    }
};

module.exports= _tl;