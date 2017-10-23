'use strict';

// Native Node Modules
const path = require('path');

// NPM Modules
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const compressionPlugin = require('compression-webpack-plugin');
const preloadWebpackPlugin = require('preload-webpack-plugin');
const webpack = require('webpack');

let production = process.env.NODE_ENV === 'production';
let css = production ? [{
      loader: 'style-loader',
      options: {
        hmr: false,
        convertToAbsoluteUrls: true
      }
    }, {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        minimize: true
      }
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [
            require('autoprefixer')
          ];
        }
      }
    }, {
      loader: 'sass-loader',
      options: {}
  }] : [ 'style-loader', 'css-loader', 'sass-loader' ];

let appTitle = 'AngularJS Youtube Playlist';
let appHtml = production ? new htmlWebpackPlugin({
  title: appTitle,
  template: `${path.join(__dirname, 'app', 'index.ejs')}`,
  favicon: `${path.join(__dirname, 'app', 'assets', 'images', 'favicon.ico')}`,
  xhtml: true,
  inject: false,
  minify: {
    decodeEntities: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
    collapseWhitespace: true
  },
  hash: true
}) : new htmlWebpackPlugin({
  title: appTitle,
  template: `${path.join(__dirname, 'app', 'index.ejs')}`,
  favicon: `${path.join(__dirname, 'app', 'assets', 'images', 'favicon.ico')}`,
  hash: true
});

let webpackConfig = {
  entry: {
    app: `${path.join(__dirname, 'app', 'js', 'app.js')}`
  },
  output: {
    path: path.resolve(__dirname, '..', 'server', 'build'),
    filename: './js/[name].bundle.js',
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['env', { 'modules': false, 'targets': { 'node': 4 } }]]
        }
      }]
    },{
      test: /\.scss$/,
      use: css
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true,
          removeComments: true,
          collapseWhitespace: true
        }
      }]
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      use: 'json-loader'
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      use: [ 'file-loader?name=assets/images/[name].[ext]', {
        loader: 'image-webpack-loader',
        query: {
          pngquant: {
            quality: '70-100',
            speed: 1,
            nofs: false,
            floyd: 1,
            posterize: 4
          },
          optipng: {
            optimizationLevel: 7,
            bitDepthReduction: true,
            colorTypeReduction: true,
            paletteReduction: true
          },
          mozjpeg: {
            quality: 100,
            progressive: true,
            interlaced: true
          },
          gifsicle: {
            interlaced: true,
            optimizationLevel: 3,
            colors: 256
          }
        }
      }]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery'
    }),
    appHtml,
    new extractTextPlugin({
      filename: 'style.min.css',
      disable: !production,
      allChunks: true
    }),
    new preloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.(jpe?g|png|gif|svg)$/i.test(entry)) return 'image';
        return 'script';
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new compressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 0,
      minRatio: 0.8
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 3000,
    stats: 'errors-only',
    hot: true,
    open: false
  }
};

if (production) {
  delete webpackConfig['devtool'];
  delete webpackConfig['devServer'];
  webpackConfig['output']['filename'] = './js/[name].bundle.min.js';
}

module.exports = webpackConfig;
