const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'vue-calendar.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'tuicalendar',
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  externals: {
    'tui-calendar': {
      'commonjs': 'tui-calendar',
      'commonjs2': 'tui-calendar',
      'amd': 'tui-calendar',
      'root': ['tui', 'Calendar']
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
