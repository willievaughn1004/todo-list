const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|png|webp|PNG)$/i,
        type: 'asset/resource'
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Serve files from this directory
    },
    port: 8080, // Specify the port you want to use
    open: true, // Automatically open the default browser
  },
};
