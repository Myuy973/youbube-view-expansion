const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  // 本番サーバーで実行された場合process.env.NODE_ENVはproductionになる
  // || は優先順位。最初がだめなら２番目が選択される
  // mode: process.env.NODE_ENV || "development",

  entry: {
    main: path.join(__dirname, "js/main.js"),
    option: path.join(__dirname, "js/option.js"),
    background: path.join(__dirname, "js/background.js"),
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },

  // importで呼び出す際の.js .tsを省略できる
  // resolve: {
  //   extensions: [".ts", ".js"],
  // },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: ".", 
          to: "../",
          context: "public"
        }
      ]
    })
  ],

};
