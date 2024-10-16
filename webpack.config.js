const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('Loading webpack config');

module.exports = {
  // Core configuration
  mode: 'development', // Set the mode to 'development' for better debugging
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output bundle file name
    path: path.resolve(__dirname, 'public'), // Output directory
  },

  // Module rules for processing different file types
  module: {
    rules: [
      // JavaScript and JSX files
      {
        test: /\.(js|jsx)$/, // Include .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel loader
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Include presets for modern JS and React
          },
        },
      },
      // CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Process CSS files
      },
      // HTML files
      {
        test: /\.html$/,
        use: ['html-loader'], // Process HTML files
      },
      // Additional loaders can be added here (e.g., for images, fonts, etc.)
    ],
  },

  // Resolve extensions for imports
  resolve: {
    extensions: ['.js', '.jsx'], // Allow importing files without specifying these extensions
  },

  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve content from the 'public' directory
    },
    port: 3000, // Port number for the dev server
    open: true, // Automatically open the browser when the server starts
    hot: true, // Enable Hot Module Replacement
  },

  // Source map generation for easier debugging
  devtool: 'inline-source-map', // Generate source maps

  // Plugins can be added here
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // path to your HTML file
    }),
    // Add plugins as needed
  ],
};