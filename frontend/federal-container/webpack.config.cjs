const HtmlWebpackPluggin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development', // or production
  plugins: [new BundleAnalyzerPlugin()],
  devServer: {
    port: 8080,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: { products: 'products@http://localhost:8081/remoteEntry.js' },
    }),
    new HtmlWebpackPluggin({
      template: './public/index.html',
    }),
  ],
};