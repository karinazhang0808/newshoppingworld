/*
* @Author: JiaoweiZhang
* @Date:   2018-07-04 19:59:27
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-04 20:19:17
*/

'use strict';

var _tl = require('util/tl.js');

var _user = {
    //check status
    checkLogin: function(resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/user/get-user-info.do'),
            method  : 'POST',
            success : resolve,
            error   :reject
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