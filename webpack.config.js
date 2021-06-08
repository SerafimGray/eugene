const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";

const CONFIG = {
  entry: "./src/js/main.js",
  mode: process.env.NODE_ENV,
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "./docs"),
    filename: "main.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: "src/fonts/",
            to: "fonts/",
          },
          {
            from: "src/assets/",
            to: "",
          },
        ]
      }
    ),
    new ImageminPlugin({
      disable: devMode,
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: { optimizationLevel: 3 },
      jpegtran: { progressive: true },
      gifsicle: { optimizationLevel: 1 },
      svgo: {},
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: "postcss-loader",
            options: { 
              postcssOptions: {
                plugins: {
                  'postcss-preset-env': {},
                  'cssnano': {}
                }
              },
              sourceMap: true 
            },
          }
        ],
      },
      {
        test: /\.(mp4|webm)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: devMode ? "[name].[ext]" : "[name].[contenthash].[ext]",
            outputPath: 'video',
          }
        }
      },
      {
        test: /\.(jpg)$/i,
        exclude: [path.resolve(__dirname, "./src/images/diplomas")],
        use: {
          loader: 'file-loader',
          options: {
            name: devMode ? '[name].[ext]' : '[name].[contenthash].[ext]',
            outputPath: 'images',
          }
        }
      },
      {
        test: /\.(svg|webp)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: devMode ? '[name].[ext]' : '[name].[contenthash].[ext]',
            outputPath: 'images/icons',
          }
        }
      },
      {
        test: /\.(jpe?g|png)$/i,
        include: [path.resolve(__dirname, "./src/images/diplomas")],
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            name: devMode ? '[name]-[width].[ext]' : '[name]-[width].[contenthash].[ext]',
            outputPath: 'images/diplomas',
            sizes: [320, 480, 640, 785]
          }
        }
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    port: 3001,
    hot: true,
    watchContentBase: true,
    noInfo: true,
  },
};

if (!devMode) {
  CONFIG.output.publicPath = "./";
  CONFIG.output.filename = "js/main.[contenthash].js";
  CONFIG.module.rules.push({
    test: [/\.js$/],
    exclude: [/node_modules/],
    loader: "babel-loader",
    options: { presets: ["@babel/preset-env"] },
  });
}

module.exports = CONFIG;
