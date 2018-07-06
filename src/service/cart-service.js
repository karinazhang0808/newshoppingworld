/*
* @Author: JiaoweiZhang
* @Date:   2018-07-04 20:24:27
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-04 20:29:16
*/

'use strict';

var _tl = require('util/tl.js');

var _cart = {
    //get number of products in the cart
    getCartCount : function(resolve, reject){
        _tl.request({
            url     : _tl.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   :reject
        });
    }
}
module.exports = _cart;