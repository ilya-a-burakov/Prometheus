'use strict';

/* */

const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackRequireFrom = require("webpack-require-from");
const babelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');

module.exports = (env) => ({
  mode: env.prod ? 'production' : 'development',

  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/dist/',
    filename: env.prod ? '[name].[chunkhash].js' : '[name].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      prometheus: path.resolve(__dirname, '../../prometheus'),
      vue: path.resolve(__dirname, '/node_modules/vue/dist/vue.runtime.esm-bundler.js'),
      vuex: path.resolve(__dirname, '/node_modules/vuex/dist/vuex.esm-bundler.js'),
      'vue-router': path.resolve(__dirname, '/node_modules/vue-router/dist/vue-router.esm-bundler.js'),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.m?js$/,
        exclude: babelLoaderExcludeNodeModulesExcept([
          'vue3-carousel'
        ]),
        use: {
          loader: 'babel-loader',
          options: {
            envName: env.prod ? 'prod' : 'dev',
          },
        },
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: require.resolve('vue-loader'),
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg|woff|ttf)$/i,
        use: {
          loader: 'url-loader',
          options: { limit: 8192, esModule: false },
        },
      },
    ],
  },
  optimization: {
    minimize: env.prod ? true : false,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        cache: true,
        parallel: true,
        sourceMap: env.prod ? false : true,
        terserOptions: {
          /* creds to vue/cli */
          compress: {
            // turn off flags with small gains to speed up minification
            arrows: false,
            collapse_vars: false, // 0.3kb
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,

            // a few flags with noticeable gains/speed ratio
            // numbers based on out of the box vendor bundle
            booleans: true, // 0.7kb
            if_return: true, // 0.4kb
            sequences: true, // 0.7kb
            unused: true, // 2.3kb

            // required features to drop conditional branches
            conditionals: true,
            dead_code: true,
            evaluate: true,
          },
          mangle: {
            safari10: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ESLintPlugin(),
    new WebpackRequireFrom({
      // see configuration options below
    }),
    new MiniCssExtractPlugin({
      filename: env.prod ? '[file].[contenthash:8].css' : '[name].css',
      chunkFilename: env.prod
        ? 'css/[name].[contenthash:8].chunk.css'
        : '[name].chunk.css',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'SERVER']),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
    }),
   

  ],
});
