const path = require('path');
var workerOpts = { inline: true};
module.exports = {
  entry: './src/index.ts',
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
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: ['node_modules'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};