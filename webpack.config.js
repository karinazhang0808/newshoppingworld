/*
* @Author: JiaoweiZhang
* @Date:   2018-06-04 12:36:30
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-07-23 15:35:00
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// environment variables configuration，dev /online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

// the method of getting parameters of html-webpack-plugin
var getHtmlConfig =function(name, title){
    return {
            template : './src/view/' +name+ '.html',
            filename : 'view/' +name+ '.html',
            title    : title,
            inject   : true,
            hash     : true,
            chunks   : ['common',name]
    };
};
var config = {
    entry: {
      'common'              : ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
      'index'               : ['./src/page/index/index.js'],
      'user-login'          : ['./src/page/user-login/index.js'],
      'user-register'       : ['./src/page/user-register/index.js'], 
      'user-pass-reset'     : ['./src/page/user-pass-reset/index.js'],
      'user-center'         : ['./src/page/user-center/index.js'],
      'user-center-update'  : ['./src/page/user-center-update/index.js'], 
      'user-pass-update'    : ['./src/page/user-pass-update/index.js'],      
      'result'              : ['./src/page/result/index.js'],
    },
    output:{
        path: './dist',
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    extenrnals:{
        'jquery':'window.jQuery'
    },
    module: {  
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttfeot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [
        //independent modules js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename:'js/base.js'
        }),
        //separately package css into file
        new ExtractTextPlugin("css/[name].css"),
        //processing of HTML modules
        new HtmlWebpackPlugin(getHtmlConfig('index','Home')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','user login')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','sign up')),  
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','Forgot password')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','My Account')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','Edit Personal Information')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','Modify the password')),      
        new HtmlWebpackPlugin(getHtmlConfig('result','NSWD')),   
    ]
};

if('dev'===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;