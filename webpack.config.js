const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'source-map',
  entry: [path.resolve(__dirname, 'src/index.ts')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /three\/examples\/js/,
        use: 'imports-loader?THREE=three',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'three-examples': path.join(
        __dirname,
        './node_modules/three/examples/js'
      ),
    },
  },
  devServer: {
    contentBase: __dirname + '/public',
    inline: true,
    port: 8000,
  },
}
