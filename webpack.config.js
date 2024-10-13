const path = require('path');

module.exports = {
  entry: './js/index.js', // Specify your entry point
  output: {
    filename: 'bundle.js', // Output file after bundling
    path: path.resolve(__dirname, 'public') // Output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // Process CSS files
      },
      {
        test: /\.(js|jsx)$/, // Process JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile JavaScript
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
