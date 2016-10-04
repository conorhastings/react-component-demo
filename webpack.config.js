const path = require('path');
module.exports = {
  context: path.join(__dirname),
  entry: { demo: './demo/index.js' },
  devtool: 'source-map',
  output: { path: path.join(__dirname, 'demo'), filename: "[name].js" },
  module: {
    loaders: [
      {
        loader: "babel",
        test: /\.js?$/,
        include: path.join(__dirname, 'demo')
      }
    ]
  }
}