const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'source-map',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
    'bundle.min': path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: ['last 2 versions'],
                    },
                    forceAllTransforms: true,
                    useBuiltIns: 'usage',
                  },
                ],
                '@babel/stage-0',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.min\.js$/,
      sourceMap: true,
      uglifyOptions: {
        compress: true,
      },
    }),
  ],
  devServer: {
    contentBase: __dirname + '/public',
    inline: true,
    port: 8000,
  },
}
