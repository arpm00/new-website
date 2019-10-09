const path = require('path');

module.exports = {
  entry: './app/assets/scripts/app.js',
  output: {
    path: path.resolve(__dirname + './app/temp/scripts'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.(js.|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['latest', {modules: false}],
          ],
        },
      },
    ],
  },
};