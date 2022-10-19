const HtmlWebpackPluggin = require('html-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development', // or production
  plugins: [new BundleAnalyzerPlugin()],
  devServer: {
    port: 8081,
  },

  plugins: [
    new HtmlWebpackPluggin({
      template: './public/index.html',
    }),
  ],
};
