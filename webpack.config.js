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
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: "src/images/",
            to: "images/",
          },
          {
            from: "src/fonts/",
            to: "fonts/",
          },
          {
            from: "src/video/",
            to: "video/",
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
        test: /\.(jpe?g|png|webp)$/i,
        use: {
          loader: 'responsive-loader',
          options: {
            adapter: require('responsive-loader/sharp'),
            name: '[name]-[width].[ext]',
            outputPath: 'images',
            sizes: [320, 480, 640]
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
  CONFIG.output.filename = "js/main.js";
  CONFIG.module.rules.push({
    test: [/\.js$/],
    exclude: [/node_modules/],
    loader: "babel-loader",
    options: { presets: ["@babel/preset-env"] },
  });
}

module.exports = CONFIG;
