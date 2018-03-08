const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["env", "react"]
        }
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
	    {
	    	test: /\.(png|svg|jpg|jpeg|gif)$/,
		    use: [
		    	'url-loader'
		    ]
	    }
    ]
  },

  // Dev tools are provided by webpack
  // Source maps help map errors to original react code
  devtool: 'cheap-module-eval-source-map',

  // Configuration for webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, 'public'),
	  proxy: {
		  "/api/*": "http://localhost:3000" //slash api for ajax would send me to lh3000 plus any routes
	  }
  },
};
