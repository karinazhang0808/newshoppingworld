/*
* @Author: JiaoweiZhang
* @Date:   2018-06-04 12:36:30
* @Last Modified by:   JiaoweiZhang
* @Last Modified time: 2018-06-29 15:22:05
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// environment variables configuration，dev /online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

// the method of getting parameters of html-webpack-plugin
var getHtmlConfig =function(name){
    return {
            template : './src/view/' +name+ '.html',
            filename : 'view/' +name+ '.html',
            inject   : true,
            hash     : true,
            chunks   : ['common',name]

    };
};
var config = {
    entry: {
      'common': ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
      'index' : ['./src/page/index/index.js'],
      'login' : ['./src/page/login/index.js'],
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
            { test: /\.(gif|png|jpg|woff|svg|eot|ttfeot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
            ]
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
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),      
    ]
};

if('dev'===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;