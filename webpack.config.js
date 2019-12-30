const path = require('path');
var OfflinePlugin = require('offline-plugin');
var workerOpts = { inline: true};
module.exports = {
  entry: {main: './src/index.ts',ex: './src/index.crex.js',inject: './src/inject/inject.js',start: './src/node/start.ts',aapi: './src/aapi.js','chrome-fill': './src/chrome-fill.ts',lively: './src/luurvely/lively.ts',test: './src/test.ts','test-online': './src/jest-entry.ts'},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader',options: Object.assign({},workerOpts) }
      },
      {
        test: /\.worker\.ts$/,
        use: [{ loader: 'worker-loader',options: Object.assign({},workerOpts) },'ts-loader']
      },
      {
        test: /\.shared-worker\.js$/,
        use: { loader: 'shared-worker-loader',options: Object.assign({},workerOpts) }
      },
      {
        test: /\.shared-worker\.ts$/,
        use: [{ loader: 'shared-worker-loader',options: Object.assign({},workerOpts) },'ts-loader']
      },
      {
        test: /\.svg/,
        use: {
            loader: 'svg-url-loader',
            options: {}
            },
      },
      {
        test: /\.wasm$/,
        loaders: ['wasm-loader']
      },
      { test: /\.handlebars$/, use: [{loader: "handlebars-loader",options: {}}] },
 
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: ['node_modules'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [

    new OfflinePlugin(),
  ],
};