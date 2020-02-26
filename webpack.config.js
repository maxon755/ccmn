const webpack = require('webpack');
const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {

    return {
        mode: argv.mode || 'development',
        entry: './source/index.jsx',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        devtool: argv.mode === 'development' ? 'inline-source-map' : false,
        plugins: [
            new ErrorOverlayPlugin(),
            new Dotenv(),
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            host: '0.0.0.0',
            port: 3000,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                        }
                    ]
                },
            ],
        },
    }
};
