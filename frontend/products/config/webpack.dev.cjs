const HtmlWebpackPluggin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.cjs');

const devConfig = {
  mode: 'development', // 'development' or 'production',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new ModuleFederationPlugin({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsIndex': './src/bootstrap',
      },
      shared: ['@luxcium/faker'],
    }),
    new HtmlWebpackPluggin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
