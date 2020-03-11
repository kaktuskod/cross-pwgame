const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.jsx"
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  resolve: {
    alias: {
      "src": path.resolve(__dirname, 'src/'),
      "@core": path.resolve(__dirname, 'src/core')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
        resolve: {
          extensions: [".js", ".jsx"]
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ]
};
