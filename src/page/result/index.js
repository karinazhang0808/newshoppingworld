/*
* @Author: JiaoweiZhang
* @Date:   2018-07-10 12:50:32
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-10 13:42:02
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _tl = require('util/tl.js');

$(function(){
    var type  = _tl.getUrlParam('type') || 'default',
        $element  = $('.'+ type + '-success').show();
    //display correspoding elements
    $element.show();  
})