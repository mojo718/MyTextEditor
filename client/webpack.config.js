const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file. (DONE)
// TODO: Add CSS loaders and babel to webpack. (DONE)

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      // Fix to help with manifest auto issue
      publicPath: ""
    },
    plugins: [
      // HTML Plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE@1.0.0'
      }),
      // Service worker plugin
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // Manifest plugin
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'JATE@1.0.0',
        short_name: 'JATE',
        description: "It's a text editor!",
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        // Uses icon for all the following icon pixel sixes
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          // CSS loader
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Babel loader
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ]
    },
  };
};
