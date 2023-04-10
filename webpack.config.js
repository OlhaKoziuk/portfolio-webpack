const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
    
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src', './js/index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js',
        clean: true,
        assetModuleFilename: '[path][name][ext]'
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Main',
        template: path.resolve(__dirname, 'src', 'index.html'),
        inject: 'body'
    }),
        new HtmlWebpackPlugin({
        title: 'Ukrainian',
        filename: 'ukrainian.html',
        template: path.resolve(__dirname, 'src', 'ukrainian.html'),
        inject: 'body'
        }),
        new MiniCssExtractPlugin({
           filename: "css/[name].[contenthash].css"
        })
        
    ],
      module: {
          rules: [
              {
              test: /\.html$/i,
              loader: 'html-loader',
              },
              {
              test: /\.(c|sa|sc)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader",
                     {
                  loader: 'postcss-loader',
                  options: {
                      postcssOptions: {
                          plugins: [require('postcss-preset-env')], 
                       }
                      }
                    },
                    "sass-loader"
                  ],
              },
               {
               test: /\.(?:js|mjs|cjs)$/,
               exclude: /node_modules/,
               use: {
                 loader: 'babel-loader',
                 options: {
                   presets: [
                     ['@babel/preset-env', { targets: "defaults" }]
                   ]
                 }
               }
             },
        
              {
                 test: /\.(png|jpe?g|webp|gif|svg)$/i,
                  type: "asset/resource",
                    generator: {
                     filename: 'img/[name][ext]'
                 }
                
              },
              {
                 test: /\.(ttf|woff|eot)$/i,
                  type: "asset/resource",
                   generator: {
                     filename: 'fonts/[name][ext]'
                 }
              },     
      ],
    },
  
};

