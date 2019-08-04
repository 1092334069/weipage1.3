const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
  	'weipage/index':'./src/js/weipage/index.js',
    'weipage/list':'./src/js/weipage/list.js',
    'weipage/view': './src/js/weipage/view.js',
    'weipage/mobile': './src/js/weipage/mobile.js'
  },
  devtool: 'inline-source-map',
  plugins: [
      new webpack.DefinePlugin({
        'process.evn':{
          NODE_ENV:"Development"
        }
      }),
      new CleanWebpackPlugin(['/dist']),
      new HtmlWebpackPlugin({
        filename: "login.html",
        template: path.resolve(__dirname, ".", "./src/html/login.html"),
        chunks: [""],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "weipage/index.html",
        template: path.resolve(__dirname, ".", "./src/html/weipage/index.html"),
        chunks: ["weipage/index"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "weipage/list.html",
        template: path.resolve(__dirname, ".", "./src/html/weipage/list.html"),
        chunks: ["weipage/list"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "weipage/view.html",
        template: path.resolve(__dirname, ".", "./src/html/weipage/view.html"),
        chunks: ["weipage/view"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new HtmlWebpackPlugin({
        filename: "weipage/mobile.html",
        template: path.resolve(__dirname, ".", "./src/html/weipage/mobile.html"),
        chunks: ["weipage/mobile"],
        minify: {
          collapseWhitespace: true
        }
      }),
      new webpack.ProvidePlugin({ $: "jquery" }),
      new uglify()
  ],
  output: {
	    filename: '[name].bundle.js',
	    path:__dirname + '/dist',
		publicPath: '/dist/'
  },  
  devServer: {
    contentBase: __dirname
  },
  module: {
     rules: [
        {
          test: /\.vue$/,
          use: ['vue-loader']
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: ['html-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }]
        },
       {
          test: require.resolve('jquery'),
          use: [{
              loader: 'expose-loader',
              options: 'jQuery'
          },{
              loader: 'expose-loader',
              options: '$'
          }]
        },
        {
          test: require.resolve('vue'),
          use: [{
              loader: 'expose-loader',
              options: 'Vue'
          }]
        }
     ]
  }
};