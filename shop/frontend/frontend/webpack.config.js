const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'app.jsx'),
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist', 'static')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                         options: {
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()] ,
    resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@contexts': path.resolve(__dirname, 'src/contexts/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/')
      }
    }
}